import React, { useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { UserAuth } from "../../context/AuthContext";
import { get, ref } from "firebase/database";
import { database } from "../../firebase.config";
import {
  Chip,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import User from "../../models/UserModel";
import { TransportationModel } from "../../models/TransporationModel";
import { getAge } from "../../utils/RandomUtils";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";

const OnboardReview = (props: OnboardPageProps) => {
  const [lifestylePreferences, setLifestylePreferences] = useState<string>();
  const [addressParts, setAddressParts] = useState<string[]>(); // split the user's address into street, city, state, and zip code
  const [transportationPreferences, setTransportationPreferences] =
    useState<TransportationModel[]>();
  const [socialPreferences, setSocialPreferences] =
    useState<SocialPreferenceModel[]>();
  const [additionalInfo, setAdditionalInfo] = useState<string>();
  const [user, setUser] = useState<User>();
  const auth = UserAuth();

  useEffect(() => {
    if (auth?.user) {
      const lifestylePreferenceRef = ref(
        database,
        `users/${auth.user.id}/lifestylePreferences`
      );
      get(lifestylePreferenceRef).then((snapshot) => {
        if (snapshot.exists()) {
          const lifestylePreferencesData = snapshot.val();
          setLifestylePreferences(
            lifestylePreferencesData.lifestylePreferences
          );
        }
      });

      const socialPrefRef = ref(
        database,
        `users/${auth.user.id}/socialPreferences`
      );
      get(socialPrefRef).then((snapshot) => {
        if (snapshot.exists()) {
          const socialPreferencesData = snapshot.val();
          const socialPreferencesList: SocialPreferenceModel[] = [];

          for (const key in socialPreferencesData) {
            socialPreferencesList.push(socialPreferencesData[key]);
          }

          setSocialPreferences(socialPreferencesList);
        }
      });

      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
        }
      });

      // split the user's address into street, city, state, and zip code
      if (user?.homeAddress) {
        setAddressParts(user.homeAddress.split(","));
      }

      const transportationRef = ref(
        database,
        `users/${auth.user.id}/transportations`
      );
      get(transportationRef).then((snapshot) => {
        if (snapshot.exists()) {
          const transportationData = snapshot.val();
          setTransportationPreferences(transportationData);
          console.log("Transportation Data: ", transportationData);
        }
      });
    }
  }, [auth?.user, user?.homeAddress]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
    },
    paper: {
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "space-between",
      padding: "20px",
      alignItems: "center",
      backgroundColor: "#F3F5EA",
      margin: "1rem 15rem 1rem",
      maxWidth: "45rem",
    },
    subContainer: {
      display: "flex",
      flexDirection: "row" as "row",
      margin: "1rem",
      width: "100%",
      justifyContent: "space-between",
    },
  };

  const geminiInstructions: string = `Act as a data scientist with expertise in Google APIs, particularly Google Maps and Places. Your primary role is to analyze and interpret user search data to create a profile focusing on transportation habits. Adopt a supportive, trustworthy, and approachable demeanor, using your strong analytical capabilities and understanding of user behavior to deliver precise results. Construct a first-person narrative describing the user's daily activities, community engagement, social settings, and lifestyle preferences in a personal, conversational tone`;

  return (
    <div style={styles.container}>
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Review Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Hey, {user?.name.split(" ")[0]}! This is what Nested has learned from
        your answers and Google takeout data. Is this correct?
      </Typography>
      <Paper elevation={1} style={styles.paper}>
        <Typography
          variant="body1"
          sx={{ margin: "1rem 5rem 1rem 0rem" }}
          gutterBottom
        >
          I am {user && user.birthday ? getAge(user.birthday) : ""} year old{" "}
          {user?.gender}, and I moved/am moving to{" "}
          {addressParts ? addressParts[1] : ""}. My address is{" "}
          {addressParts ? addressParts[0] : ""}, and I prefer to travel by{" "}
          {transportationPreferences &&
            (() => {
              const preferences = Object.entries(transportationPreferences)
                .filter(([key, value]) => value.selected)
                .sort(
                  ([keyA, valueA], [keyB, valueB]) =>
                    valueA.radius - valueB.radius
                )
                .map(
                  ([key, value]) => `${value.method} (${value.radius} miles)`
                );

              if (preferences.length > 1) {
                const lastPreference = preferences.pop();
                return preferences.join(", ") + ", and " + lastPreference;
              } else {
                return preferences[0];
              }
            })()}
        </Typography>
        <div style={styles.subContainer}>
          <Typography variant="subtitle1">
            I have the following routines and preferences in my locations:{" "}
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <AutoAwesomeIcon />
            <Typography variant="subtitle2">Generated with Gemini</Typography>
            <Tooltip sx={{ cursor: "pointer" }} title={geminiInstructions}>
              <InfoRoundedIcon />
            </Tooltip>
          </Stack>
        </div>
        <TextField
          multiline
          rows={4}
          value={lifestylePreferences}
          onChange={(e) => setLifestylePreferences(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Typography
          variant="body1"
          sx={{
            marginTop: "1rem",
            marginLeft: 0,
            marginBottom: "0.5rem",
            width: "100%",
          }}
        >
          When deciding on the places I go frequently, I care about the
          following priorities:
        </Typography>
        <Stack
          direction={"row"}
          alignSelf={"start"}
          marginBottom="0.5rem"
          width={"100%"}
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: "0.5rem",
          }}
        >
          {socialPreferences?.map((preference) =>
            preference.selected ? (
              <Chip
                key={preference.name}
                color="success"
                label={preference.name}
                style={{ margin: "0.5rem" }}
              />
            ) : null
          )}
        </Stack>

        <TextField
          label="Anything else you would like to add?"
          variant="filled"
          fullWidth
          color="success"
          helperText="You may type freely here."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </Paper>
    </div>
  );
};

export default OnboardReview;
