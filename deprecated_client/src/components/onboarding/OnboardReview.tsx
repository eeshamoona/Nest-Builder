import React, { useCallback, useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { UserAuth } from "../../context/AuthContext";
import { get, ref, set } from "firebase/database";
import { database } from "../../firebase.config";
import { Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import User from "../../models/UserModel";
import { TransportationModel } from "../../models/TransporationModel";
import { getAge } from "../../utils/RandomUtils";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import GenerateWithGemini from "../GenerateWithGemini";
import { getTransportationString } from "../../services/ExploreService";
import { reviewPromptMarkdown } from "../../constants/OnboardingTooltipConstants";

const OnboardReview = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const [lifestylePreferences, setLifestylePreferences] = useState<string>();
  const [addressParts, setAddressParts] = useState<string[]>(); // split the user's address into street, city, state, and zip code
  const [transportationPreferences, setTransportationPreferences] = useState<
    TransportationModel[]
  >([]);
  const [socialPreferences, setSocialPreferences] =
    useState<SocialPreferenceModel[]>();
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [user, setUser] = useState<User>();

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
          setAdditionalInfo(lifestylePreferencesData.additionalInfo);
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
          const transportationData: Record<string, TransportationModel> =
            snapshot.val();
          const transportationArray: TransportationModel[] =
            Object.values(transportationData);
          setTransportationPreferences(transportationArray);
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
      margin: "1rem 0",
      maxWidth: "45rem",
      minWidth: " 43rem",
    },
    subContainer: {
      display: "flex",
      flexDirection: "row" as "row",
      margin: "1rem",
      width: "100%",
      justifyContent: "space-between",
    },
  };

  const saveData = useCallback(async () => {
    if (auth?.user) {
      const lifestylePreferenceRef = ref(
        database,
        `users/${auth.user.id}/lifestylePreferences`
      );
      set(lifestylePreferenceRef, {
        lifestylePreferences: lifestylePreferences,
        additionalInfo: additionalInfo,
      });
    }
  }, [additionalInfo, auth?.user, lifestylePreferences]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

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
          {getTransportationString(transportationPreferences || [])}.{" "}
        </Typography>
        <div style={styles.subContainer}>
          <Typography variant="subtitle1">
            I have the following routines and preferences in my locations:{" "}
          </Typography>
          <GenerateWithGemini prompt={reviewPromptMarkdown} />
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
