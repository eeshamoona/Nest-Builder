import React, { useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { UserAuth } from "../../context/AuthContext";
import { get, ref } from "firebase/database";
import { database } from "../../firebase.config";
import { Paper, TextField, Tooltip, Typography } from "@mui/material";
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
      margin: "1rem",
    },
    paper: {
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "space-between",
      padding: "20px",
      alignItems: "center",
      backgroundColor: "#F3F5EA",
      margin: "5rem 10rem",
      marginTop: "1rem",
    },
    subContainer: {
      display: "flex",
      flexDirection: "row" as "row",
      margin: "1rem",
    },
  };

  const geminiInstructions: string = `Act as a data scientist with expertise in Google APIs, particularly Google Maps and Places. Your primary role is to analyze and interpret user search data to create a profile focusing on transportation habits. Adopt a supportive, trustworthy, and approachable demeanor, using your strong analytical capabilities and understanding of user behavior to deliver precise results. Construct a first-person narrative describing the user's daily activities, community engagement, social settings, and lifestyle preferences in a personal, conversational tone`;

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Review Information
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Hey, {user?.name.split(" ")[0]}! This is what Nested has learned from
        your answers and Google takeout data. Is this correct?
      </Typography>
      <Paper elevation={1} style={styles.paper}>
        <Typography variant="inherit">
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
          <Typography variant="h5" fontSize={"large"}>
            I have the following routines and preferences in my locations:{" "}
          </Typography>
          <AutoAwesomeIcon />
          <Typography variant="h6" fontSize={"large"}>
            Generated with Gemini
          </Typography>
          <Tooltip title={geminiInstructions}>
            <InfoRoundedIcon />
          </Tooltip>
        </div>
        <TextField
          multiline
          rows={4}
          value={lifestylePreferences}
          onChange={(e) => setLifestylePreferences(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Typography variant="subtitle1" gutterBottom>
          When deciding on the places I go frequently, I care about the
          following priorities:{" "}
          {socialPreferences?.map((preference) =>
            preference.selected ? preference.name + ", " : ""
          )}
        </Typography>

        <TextField
          label="Anything else you would like to add?"
          variant="filled"
          fullWidth
          helperText="You maybe type freely here."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </Paper>
    </div>
  );
};

export default OnboardReview;
