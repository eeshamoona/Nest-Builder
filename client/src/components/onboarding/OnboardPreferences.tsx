import React, { useCallback, useEffect, useState } from "react";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { SocialPreferenceModel } from "../../models/SocialPreferenceModel";
import { UserAuth } from "../../context/AuthContext";
import { get, ref, update } from "firebase/database";
import { database } from "../../firebase.config";
import { Card, CardContent, Typography } from "@mui/material";

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
    <div>
      <h1>Onboard Preferences</h1>
      {socialPreferences.map((preference, index) => (
        <Card
          key={index}
          onClick={() => handleCardClick(index)}
          style={{
            backgroundColor: preference.selected ? "lightgray" : "white",
          }}
          title={preference.description}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {preference.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OnboardPreferences;
