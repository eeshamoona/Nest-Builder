import React, { useCallback, useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { formatBirthday } from "../../utils/RandomUtils";
import GoogleDrivePicker from "react-google-drive-picker";
import { getProfileData } from "../../services/FullOnboardingProfileService";
import { Profile } from "../../services/FullOnboardingProfileService";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { Tabs, Tab, Box } from "@mui/material";
import { CategoryModel } from "../../models/CategoryModel";
import CategoryCard from "../CategoryCard";
import SocialPreferenceCard from "../SocialPreferenceCard";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { TransportationModel } from "../../models/TransporationModel";
import TransportationCard from "../TransportationCard";
// import CategoryCard from "../CategoryCard";
// import { CategoryModel } from "../../models/CategoryModel";

const defaultProfile: Profile = {
  homeAddress: "",
  workAddress: "",
  transportation: [
    {
      method: "car",
      radius: 0,
      selected: false,
    },
    {
      method: "bike",
      radius: 0,
      selected: false,
    },
    {
      method: "publicTransport",
      radius: 0,
      selected: false,
    },
    {
      method: "walking",
      radius: 0,
      selected: false,
    },
  ],
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

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const uploadFile = async (file: any) => {
    setLoading(true);

    try {
      const data: Profile = await getProfileData(file);
      if (!data) {
        console.error("Error: No data found");
        setLoading(false);
        return;
      }

      setNewProfileData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickerOpen = () => {
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

  //TODO: Get from backend?? but will they go through this onboarding process again?
  const fetchGoogleInfo = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    if (!birthday || !gender) {
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
    fetchGoogleInfo();
  }, [fetchGoogleInfo]);

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
        </div>
        <div style={styles.halfWidth}>
          <h3>Onboard your data [Optional]</h3>
          <p>
            Adding your Google Takeout Data can help you autofill your profile
            and give more accurate reccomendations! Follow this tutorial
            first...
          </p>
          <button onClick={handlePickerOpen}>Open Google Drive Picker</button>
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
