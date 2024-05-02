import React, { useCallback, useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { UserAuth } from "../../context/AuthContext";
import { get, ref, set, update } from "firebase/database";
import { database } from "../../firebase.config";
import { Typography, Button, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GenerateWithGemini from "../GenerateWithGemini";
import { preferencesPromptMarkdown } from "../../constants/OnboardingTooltipConstants";

const OnboardPreferences = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const [socialPreferences, setSocialPreferences] = useState<
    SocialPreferenceModel[]
  >([]);

  const [newPreferenceName, setNewPreferenceName] = useState("");

  const handleAddPreference = (preference: string) => {
    console.log("Adding preference", preference);
    if (preference) {
      setSocialPreferences((prevState) => [
        ...prevState,
        { name: preference, selected: true },
      ]);
      setNewPreferenceName("");
    }
  };

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
      const updatePromises = socialPreferences.map(async (preference) => {
        const preferenceRef = ref(
          database,
          `users/${auth.user?.id}/socialPreferences/${preference.name}`
        );
        return get(preferenceRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              return update(preferenceRef, { selected: preference.selected });
            } else {
              return set(preferenceRef, preference);
            }
          })
          .catch((error) => {
            console.error("Error checking document existence: ", error);
          });
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
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        We use these lifestyle preferences to help you narrow down the best
        places to visit, so please select at least 3. You can always change
        these later.
      </Typography>
      <Box width={"100%"} display="flex" justifyContent="flex-end" mb="1rem">
        <GenerateWithGemini prompt={preferencesPromptMarkdown} />
      </Box>
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            value={newPreferenceName}
            onChange={(e) => setNewPreferenceName(e.target.value)}
            label="Add a New Preference Here"
            variant="outlined"
            fullWidth
            color="success"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    handleAddPreference(newPreferenceName);
                  }}
                  color="success"
                >
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OnboardPreferences;
