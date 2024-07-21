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
import { OnboardPageProps } from "../../models/OnboardPageProps";
import {
  Typography,
  Paper,
  TextField,
  Avatar,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { CategoryModel } from "../../models/CategoryModel";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { TransportationModel } from "../../models/TransporationModel";
import { ref, set, update, get } from "firebase/database";
import { database } from "../../firebase.config";
import UserModel from "../../models/UserModel";
import googleDriveIcon from "../../assets/icons8-google-drive.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GenerateWithGemini from "../GenerateWithGemini";
import { initialIntroPromptMarkdown } from "../../constants/OnboardingTooltipConstants";

const OnboardMethod = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const [openPicker] = GoogleDrivePicker();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [addressInstructionStatus, setAddressInstructionStatus] = useState<
    "loading" | "done" | "error"
  >("loading");
  const [transportationInstructionStatus, setTransportationInstructionStatus] =
    useState<"loading" | "done" | "error">("loading");
  const [categoriesInstructionStatus, setCategoriesInstructionStatus] =
    useState<"loading" | "done" | "error">("loading");
  const [
    socialPreferencesInstructionStatus,
    setSocialPreferencesInstructionStatus,
  ] = useState<"loading" | "done" | "error">("loading");

  // Function to generate the address data and save it to the database
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
        setAddressInstructionStatus("done");
      } catch (error) {
        console.error("Error getting address data:", error);
        setAddressInstructionStatus("error");
      }
    },
    [auth?.user]
  );

  // Function to generate the transportation data and save it to the database
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

          //first clear any existing transportation
          const userRef = ref(
            database,
            `users/${auth.user.id}/transportations`
          );
          set(userRef, {}).catch((error) => {
            console.error("Error updating user data:", error);
          });

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
        setTransportationInstructionStatus("done");
      } catch (error) {
        console.error("Error getting transportation data:", error);
        setTransportationInstructionStatus("error");
      }
    },
    [auth?.user]
  );

  // Function to generate the categories data and save it to the database
  const getCategoriesData = useCallback(
    async (file: any) => {
      try {
        const categoriesInstruction = createCategoriesInstruction();
        const categoriesData = await sendProfileRequest(
          categoriesInstruction,
          file
        );
        console.log("Categories Data: ", categoriesData);
        if (auth?.user) {
          const updates: CategoryModel[] = categoriesData.categories;

          //first clear any existing categories
          const userRef = ref(database, `users/${auth.user.id}/categories`);
          set(userRef, {}).catch((error) => {
            console.error("Error updating user data:", error);
          });

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
        setCategoriesInstructionStatus("done");
      } catch (error) {
        console.error("Error getting categories data:", error);
        setCategoriesInstructionStatus("error");
      }
    },
    [auth?.user]
  );

  // Function to generate the social preferences data and save it to the database
  const getSocialPreferencesData = useCallback(
    async (file: any) => {
      try {
        const socialPreferencesInstruction =
          createSocialPreferencesInstruction();
        const socialPreferencesData = await sendProfileRequest(
          socialPreferencesInstruction,
          file
        );
        console.log("Social Preferences Data: ", socialPreferencesData);
        if (auth?.user) {
          const socialPreferences: SocialPreferenceModel[] =
            socialPreferencesData.socialPreferences;

          const otherPreferences: any = socialPreferencesData.otherPreferences;
          const lifestylePreferences: string =
            socialPreferencesData.lifestyleParagraph;

          console.log("Other Preferences: ", otherPreferences);
          console.log("Lifestyle Preferences: ", lifestylePreferences);

          //first clear any existing social preferences
          const userRef = ref(
            database,
            `users/${auth.user.id}/socialPreferences`
          );
          set(userRef, {}).catch((error) => {
            console.error("Error updating user data:", error);
          });

          socialPreferences.forEach((socialPreference) => {
            const socialPrefRef = ref(
              database,
              `users/${auth.user?.id}/socialPreferences/${socialPreference.name}`
            );
            set(socialPrefRef, socialPreference).catch((error) => {
              console.error("Error updating user data:", error);
            });
          });

          otherPreferences.forEach((otherPreference: string) => {
            const socialPrefRef = ref(
              database,
              `users/${auth.user?.id}/socialPreferences/${otherPreference}`
            );
            set(socialPrefRef, {
              name: otherPreference,
              selected: false,
            }).catch((error) => {
              console.error("Error updating user data:", error);
            });
          });

          const lifestyleRef = ref(
            database,
            `users/${auth.user.id}/lifestylePreferences`
          );
          update(lifestyleRef, { lifestylePreferences }).catch((error) => {
            console.error("Error updating user data:", error);
          });
        }
        setSocialPreferencesInstructionStatus("done");
      } catch (error) {
        console.error("Error getting social preferences data:", error);
        setSocialPreferencesInstructionStatus("error");
      }
    },
    [auth?.user]
  );

  const uploadFile = async (file: any) => {
    setLoading(true);
    setAddressInstructionStatus("loading");
    setTransportationInstructionStatus("loading");
    setCategoriesInstructionStatus("loading");
    setSocialPreferencesInstructionStatus("loading");

    await getAddressData(file);
    await getTransportationData(file);
    await getCategoriesData(file);
    await getSocialPreferencesData(file);
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

      callbackFunction: async (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          console.log(data);

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

  const saveData = useCallback(() => {
    // Save data logic here...
    console.log("Save Data: ", { birthday: birthday, gender: gender });
    if (auth?.user) {
      const userRef = ref(database, `users/${auth.user.id}`);
      update(userRef, { birthday: birthday, gender: gender }).catch((error) => {
        console.error("Error updating user data:", error);
      });
    }
  }, [auth?.user, birthday, gender]);

  //TODO: Make this into a service in FullOnboardingProfileService
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

      setBirthday(userBirthday);
      setGender(userGender);
    }
  }, [birthday, gender]);

  useEffect(() => {
    if (auth?.user) {
      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();
            if (user.birthday && user.gender) {
              setBirthday(user.birthday);
              setGender(user.gender);
            } else {
              fetchGoogleInfo();
            }
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    }
  }, [auth?.user, fetchGoogleInfo]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "space-around",
      padding: "20px",
    },
    halfWidth: {
      width: "48%",
      boxSizing: "border-box" as "border-box",
    },
    paper: {
      display: "flex",
      flexDirection: "column" as "column",
      padding: "1.25rem",
      borderRadius: "0.5rem",
      backgroundColor: "#F3F5EA",
    },
    statusContainer: {
      display: "flex",
      flexDirection: "row" as "row",
      alignItems: "center",
      gap: "0.5rem",
    },
    statusTitle: { fontWeight: "bold", color: "dimgray" },
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginTop: "1rem", marginBottom: "0.5rem", textAlign: "center" }}
      >
        Let’s Make Your New City Feel Like Home
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Nested leverages Gemini 1.5 (Google’s LLM) to find places in your new
        city that can facilitate your lifestyle.
      </Typography>
      <Typography variant="body2" mb="1.5rem" sx={{ textAlign: "center" }}>
        First, please answer some questions so Nested can provide better
        suggestions:
      </Typography>
      <div style={styles.container}>
        <div style={styles.halfWidth}>
          <Paper variant="outlined" style={styles.paper}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Basic Info
            </Typography>
            <Typography
              variant="body2"
              sx={{ alignSelf: "center", marginBottom: "1.5rem" }}
            >
              We are pulling this information from your Google Account. If it is
              incorrect, please update it here.
            </Typography>
            <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={auth?.user?.photoURL}
                alt="UserPicture"
              />
              <Stack spacing={2} width={"100%"}>
                <TextField
                  size="small"
                  type="text"
                  label="Name"
                  defaultValue={auth?.user?.name}
                  fullWidth
                  margin="none"
                />
                <TextField
                  size="small"
                  type="text"
                  label="Email"
                  defaultValue={auth?.user?.email}
                  fullWidth
                />

                <TextField
                  size="small"
                  type="text"
                  label="Birthday"
                  value={birthday ? formatBirthday(birthday) : ""}
                  fullWidth
                  onChange={(e) => setBirthday(new Date(e.target.value))}
                />

                <TextField
                  size="small"
                  type="text"
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Paper>
        </div>
        <div style={styles.halfWidth}>
          <Paper variant="outlined" style={styles.paper}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
              >
                AI Onboarding [Optional]
              </Typography>

              <GenerateWithGemini prompt={initialIntroPromptMarkdown} />
            </Stack>
            <Typography
              variant="body2"
              sx={{ alignSelf: "center", marginBottom: "1.5rem" }}
            >
              Adding your Google Takeout data helps Nested autofill onboarding
              questions to save you time and is not stored. You also have the
              option to answer questions manually, up to you!
            </Typography>

            <Button
              component="label"
              role={undefined}
              variant="text"
              color="inherit"
              tabIndex={-1}
              fullWidth
              onClick={handleGoogleDrivePickerOpen}
              startIcon={
                <img
                  style={{ width: "3rem", height: "3rem" }}
                  src={googleDriveIcon}
                  alt="Google Drive"
                />
              }
            >
              <Typography variant="h6">Upload Google Takeout Data</Typography>
            </Button>

            {loading ? (
              <Stack
                direction={"row"}
                justifyContent={"space-around"}
                marginTop={"1.5rem"}
                marginBottom={"1rem"}
              >
                <Stack spacing={1} marginTop={"1rem"}>
                  <div style={styles.statusContainer}>
                    {addressInstructionStatus === "loading" && (
                      <CircularProgress size={20} />
                    )}
                    {addressInstructionStatus === "done" && (
                      <CheckCircleIcon style={{ color: "green" }} />
                    )}
                    {addressInstructionStatus === "error" && (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                    <Typography variant="h6" style={styles.statusTitle}>
                      Location
                    </Typography>
                  </div>
                  <div style={styles.statusContainer}>
                    {transportationInstructionStatus === "loading" && (
                      <CircularProgress size={20} />
                    )}
                    {transportationInstructionStatus === "done" && (
                      <CheckCircleIcon style={{ color: "green" }} />
                    )}
                    {transportationInstructionStatus === "error" && (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                    <Typography variant="h6" style={styles.statusTitle}>
                      Transportation
                    </Typography>
                  </div>
                </Stack>
                <Stack spacing={1} marginTop={"1rem"}>
                  <div style={styles.statusContainer}>
                    {categoriesInstructionStatus === "loading" && (
                      <CircularProgress size={20} />
                    )}
                    {categoriesInstructionStatus === "done" && (
                      <CheckCircleIcon style={{ color: "green" }} />
                    )}
                    {categoriesInstructionStatus === "error" && (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                    <Typography variant="h6" style={styles.statusTitle}>
                      Categories
                    </Typography>
                  </div>
                  <div style={styles.statusContainer}>
                    {socialPreferencesInstructionStatus === "loading" && (
                      <CircularProgress size={20} />
                    )}
                    {socialPreferencesInstructionStatus === "done" && (
                      <CheckCircleIcon style={{ color: "green" }} />
                    )}
                    {socialPreferencesInstructionStatus === "error" && (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                    <Typography variant="h6" style={styles.statusTitle}>
                      Social Preferences
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            ) : null}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default OnboardMethod;
