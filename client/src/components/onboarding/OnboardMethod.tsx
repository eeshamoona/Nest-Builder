import React, { useCallback, useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { formatBirthday } from "../../utils/RandomUtils";
import GoogleDrivePicker from "react-google-drive-picker";
import {
  createAddressInstruction,
  createCategoriesInstruction,
  createSocialPreferencesInstruction,
  createTransportationInstruction,
  sendProfileRequest,
} from "../../services/FullOnboardingProfileService";
import { Profile } from "../../services/FullOnboardingProfileService";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { Tabs, Tab, Box } from "@mui/material";
import { CategoryModel } from "../../models/CategoryModel";
import CategoryCard from "../CategoryCard";
import SocialPreferenceCard from "../SocialPreferenceCard";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { TransportationModel } from "../../models/TransporationModel";
import TransportationCard from "../TransportationCard";
import { ref, set, update, get } from "firebase/database";
import { database } from "../../firebase.config";
import UserModel from "../../models/UserModel";

const defaultProfile: Profile = {
  homeAddress: "",
  workAddress: "",
  transportation: [],
  categories: [],
  socialPreferences: [],
};

const OnboardMethod = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [openPicker] = GoogleDrivePicker();
  const [loading, setLoading] = useState(false);
  const [newProfileData, setNewProfileData] = useState<Profile>(defaultProfile);
  const [addressInstructionStatus, setAddressInstructionStatus] =
    useState(false);
  const [transportationInstructionStatus, setTransportationInstructionStatus] =
    useState(false);
  const [categoriesInstructionStatus, setCategoriesInstructionStatus] =
    useState(false);
  const [
    socialPreferencesInstructionStatus,
    setSocialPreferencesInstructionStatus,
  ] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getAddressData = useCallback(
    async (file: any) => {
      try {
        const addressInstruction = createAddressInstruction();
        const addressData = await sendProfileRequest(addressInstruction, file);
        console.log("Address Data: ", addressData);
        if (auth?.user) {
          const userRef = ref(database, `users/${auth.user.id}`);
          get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const updates: Partial<UserModel> = {
                  homeAddress: addressData.homeAddress,
                  workAddress: addressData.workAddress,
                };

                update(userRef, updates);
              }
            })
            .catch((error) => {
              console.error("Error updating user data:", error);
            });
        }
        setNewProfileData((prevData) => ({
          ...prevData,
          homeAddress: addressData.homeAddress,
          workAddress: addressData.workAddress,
        }));
        setAddressInstructionStatus(true);
      } catch (error) {
        console.error("Error getting address data:", error);
      }
    },
    [auth?.user]
  );

  const getTransportationData = useCallback(
    async (file: any) => {
      try {
        const transportationInstruction = createTransportationInstruction();
        const transportationData = await sendProfileRequest(
          transportationInstruction,
          file
        );
        console.log("Transportation Data: ", transportationData);
        if (auth?.user) {
          const updates: TransportationModel[] =
            transportationData.transportation;
          updates.forEach((transportation) => {
            const userRef = ref(
              database,
              `users/${auth.user?.id}/transportations/${transportation.method}`
            );
            set(userRef, transportation).catch((error) => {
              console.error("Error updating user data:", error);
            });
          });
        }
        setNewProfileData((prevData) => ({
          ...prevData,
          transportation: transportationData.transportation,
        }));
        setTransportationInstructionStatus(true);
      } catch (error) {
        console.error("Error getting transportation data:", error);
      }
    },
    [auth?.user]
  );

  const getCategoriesData = useCallback(
    async (file: any) => {
      const categoriesInstruction = createCategoriesInstruction();
      const categoriesData = await sendProfileRequest(
        categoriesInstruction,
        file
      );
      console.log("Categories Data: ", categoriesData);
      if (auth?.user) {
        const updates: CategoryModel[] = categoriesData.categories;
        updates.forEach((category) => {
          const userRef = ref(
            database,
            `users/${auth.user?.id}/categories/${category.title}`
          );
          set(userRef, category).catch((error) => {
            console.error("Error updating user data:", error);
          });
        });
      }
      setNewProfileData((prevData) => ({
        ...prevData,
        categories: categoriesData.categories,
      }));
      setCategoriesInstructionStatus(true);
    },
    [auth?.user]
  );

  const getSocialPreferencesData = useCallback(
    async (file: any) => {
      const socialPreferencesInstruction = createSocialPreferencesInstruction();
      const socialPreferencesData = await sendProfileRequest(
        socialPreferencesInstruction,
        file
      );
      console.log("Social Preferences Data: ", socialPreferencesData);
      if (auth?.user) {
        const updates: SocialPreferenceModel[] =
          socialPreferencesData.socialPreferences;
        updates.forEach((socialPreference) => {
          const userRef = ref(
            database,
            `users/${auth.user?.id}/socialPreferences/${socialPreference.name}`
          );
          set(userRef, socialPreference).catch((error) => {
            console.error("Error updating user data:", error);
          });
        });
      }
      setNewProfileData((prevData) => ({
        ...prevData,
        socialPreferences: socialPreferencesData.socialPreferences,
      }));
      setSocialPreferencesInstructionStatus(true);
    },
    [auth?.user]
  );

  const uploadFile = async (file: any) => {
    setLoading(true);
    setAddressInstructionStatus(false);
    setTransportationInstructionStatus(false);
    setCategoriesInstructionStatus(false);
    setSocialPreferencesInstructionStatus(false);

    await getAddressData(file);
    await getTransportationData(file);
    await getCategoriesData(file);
    await getSocialPreferencesData(file);

    setLoading(false);
  };

  const handleGoogleDrivePickerOpen = () => {
    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      console.error("No token found");
      return;
    }
    openPicker({
      clientId: "",
      developerKey: "",
      viewId: "DOCS",
      token: token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // Other configuration options...
      callbackFunction: async (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          console.log(data);

          // Get the file's metadata and download URL
          const file = data.docs[0];
          console.log("File metadata: ", file);

          try {
            fetch("http://localhost:5000/get-google-drive-file", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                oauth_token: token,
                file_id: file.id,
              }),
            })
              .then((response) => response.arrayBuffer())
              .then((data) => {
                const blob = new Blob([data]);
                const file = new File([blob], "Google_Takeout_Data");
                console.log(file);
                uploadFile(file);
              })
              .catch((error) => console.error(error));
          } catch (error) {
            console.error(error);
          }
        }
      },
    });
  };

  //TODO: Make this into a service in FullOnboardingProfileService
  const fetchGoogleInfo = useCallback(async () => {
    console.log("Entered fetchGoogleInfo");
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    if (!birthday || !gender) {
      console.log("Calling fetch-people-info");
      const response = await fetch("http://localhost:5000/fetch-people-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (!response.ok) {
        console.log("Error fetching Google Info. Response: ", response);
        return null;
      }

      const googleInfo = await response.json();
      console.log("NEW Google Info: ", googleInfo);

      let userBirthday = null;
      let userGender = null;
      let userAddresses = [];

      if (googleInfo?.birthdays) {
        for (const birthday of googleInfo.birthdays) {
          if (birthday.date && birthday.date.year) {
            userBirthday = new Date(
              birthday.date.year,
              birthday.date.month - 1,
              birthday.date.day
            );
            break; // Exit the loop after finding a birthday with year
          }
        }
      }

      if (googleInfo?.genders) {
        userGender = googleInfo.genders[0]?.formattedValue;
      }

      if (googleInfo?.addresses) {
        //TODO: Confirm this is the way to destructure the address
        userAddresses = googleInfo.addresses[0]?.formattedValue;
        console.log("FOUND AN ADDRESS: ", userAddresses);
      }

      setBirthday(formatBirthday(userBirthday));
      setGender(userGender);
    }
  }, [birthday, gender]);

  useEffect(() => {
    if (auth?.user) {
      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef)
        .then((snapshot) => {
          // if (snapshot.exists()) {
          //   const user = snapshot.val();
          //   setBirthday(formatBirthday(user.birthday || null));
          //   setGender(user.gender || "");
          // } else {
          //   fetchGoogleInfo();
          // }
          if (snapshot.exists()) {
            const user = snapshot.val();
            if (user.birthday) {
              setBirthday(formatBirthday(user.birthday || null));
              setGender(user.gender || "");
            }
            else {
              fetchGoogleInfo();
            }
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    }
  }, [auth?.user, fetchGoogleInfo]);

  const saveData = useCallback(() => {
    // Save data logic here...
    console.log("Save Data: ", { birthday: birthday, gender: gender });
  }, [birthday, gender]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "space-between",
      padding: "20px",
    },
    halfWidth: {
      width: "48%",
      boxSizing: "border-box" as "border-box",
    },
    paper: {
      padding: "20px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      backgroundColor: "#007BFF",
      color: "white",
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <>
      <h1>Let's Get Started!</h1>
      <div style={styles.container}>
        <div style={styles.halfWidth}>
          <div style={styles.paper}>
            <h6>Available User Information</h6>
            <img
              src={auth?.user?.photoURL}
              alt="User"
              style={{ borderRadius: "50%" }}
            />

            <input
              type="text"
              placeholder="Name"
              defaultValue={auth?.user?.name}
              disabled
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Email"
              defaultValue={auth?.user?.email}
              disabled
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            Address Instruction: {addressInstructionStatus ? "✅" : "❌"}
          </div>
          <div>
            Transportation Instruction:{" "}
            {transportationInstructionStatus ? "✅" : "❌"}
          </div>
          <div>
            Categories Instruction: {categoriesInstructionStatus ? "✅" : "❌"}
          </div>
          <div>
            Social Preferences Instruction:{" "}
            {socialPreferencesInstructionStatus ? "✅" : "❌"}
          </div>
        </div>
        <div style={styles.halfWidth}>
          <h3>Onboard your data [Optional]</h3>
          <p>
            Adding your Google Takeout Data can help you autofill your profile
            and give more accurate reccomendations! Follow this tutorial
            first...
          </p>
          <button onClick={handleGoogleDrivePickerOpen}>
            Open Google Drive Picker
          </button>
          {loading ? (
            <progress value={undefined} />
          ) : (
            <div>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                orientation="vertical"
              >
                <Tab label="Home Address" />
                <Tab label="Work Address" />
                <Tab label="Transportation" />
                <Tab label="Categories" />
                <Tab label="Social Preferences" />
              </Tabs>
              {selectedTab === 0 && <Box>{newProfileData.homeAddress}</Box>}
              {selectedTab === 1 && <Box>{newProfileData.workAddress}</Box>}
              {selectedTab === 2 && (
                <Box>
                  {JSON.stringify(newProfileData.transportation)}
                  {newProfileData.transportation &&
                    newProfileData.transportation.map(
                      (transportation: TransportationModel) => (
                        <TransportationCard
                          key={transportation.method}
                          transportation={transportation}
                          onSelectedChange={() => {}}
                          onRadiusChange={() => {}}
                          {...transportation}
                        />
                      )
                    )}
                </Box>
              )}
              {selectedTab === 3 && (
                <Box style={{ overflowY: "auto", maxHeight: "100vh" }}>
                  {newProfileData.categories &&
                    newProfileData.categories.map((category: CategoryModel) => (
                      <CategoryCard key={category.title} {...category} />
                    ))}
                </Box>
              )}
              {selectedTab === 4 && (
                <Box
                  style={{
                    display: "grid",
                    columnGap: "1rem",
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                >
                  {newProfileData.socialPreferences &&
                    newProfileData.socialPreferences.map(
                      (socialPreference: SocialPreferenceModel) => (
                        <SocialPreferenceCard
                          key={socialPreference.name}
                          socialPreference={socialPreference}
                          onSelect={() => {}}
                          {...socialPreference}
                        />
                      )
                    )}
                </Box>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardMethod;
