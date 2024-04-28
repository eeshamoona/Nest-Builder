import React, { useCallback, useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { UserAuth } from "../../context/AuthContext";
import { get, ref, update } from "firebase/database";
import { database } from "../../firebase.config";
import { Typography, Button } from "@mui/material";
import { Grid } from "@mui/material";

const OnboardPreferences = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const [socialPreferences, setSocialPreferences] = useState<
    SocialPreferenceModel[]
  >([]);

  useEffect(() => {
    if (auth?.user) {
      const socialPreferenceRef = ref(
        database,
        `users/${auth.user.id}/socialPreferences`
      );
      get(socialPreferenceRef).then((snapshot) => {
        if (snapshot.exists()) {
          const socialPreferencesData = snapshot.val();
          const socialPreferencesList: SocialPreferenceModel[] = [];

          for (const key in socialPreferencesData) {
            socialPreferencesList.push(socialPreferencesData[key]);
          }

          setSocialPreferences(socialPreferencesList);
        }
      });
    }
  }, [auth?.user]);

  const handleCardClick = (index: number) => {
    setSocialPreferences((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const saveData = useCallback(async () => {
    if (auth?.user) {
      const updatePromises = socialPreferences.map((preference) => {
        const preferenceRef = ref(
          database,
          `users/${auth.user?.id}/socialPreferences/${preference.name}`
        );
        return update(preferenceRef, { selected: preference.selected });
      });

      try {
        await Promise.all(updatePromises);
      } catch (error) {
        console.error("Error updating social preferences:", error);
      }
    }
  }, [auth?.user, socialPreferences]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "1rem", textAlign: "center" }}>
        What is important to you?
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginBottom: "2rem", textAlign: "center" }}
      >
        We use these lifestyle preferences to help you narrow down the best
        places to visit, so please select at least 3. You can always change
        these later.
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
        {socialPreferences.map((preference, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              variant={preference.selected ? "contained" : "outlined"}
              color="success"
              onClick={() => handleCardClick(index)}
              fullWidth
            >
              <Typography variant="body1">{preference.name}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OnboardPreferences;
