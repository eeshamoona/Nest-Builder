import { Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { ExploreCardModel } from "../models/ExploreCardModel";
import { UserAuth } from "../context/AuthContext";
import { ref, get } from "firebase/database";
import { database } from "../firebase.config";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
import { TransportationModel } from "../models/TransporationModel";
import User from "../models/UserModel";
import { CategoryModel } from "../models/CategoryModel";
import ExploreCategory from "../components/ExploreCategory";

const ExplorePage = () => {
  const auth = UserAuth();
  const [lifestylePreferences, setLifestylePreferences] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [user, setUser] = useState<User>({} as User);
  const [addressParts, setAddressParts] = useState<string[]>([]);
  const [socialPreferences, setSocialPreferences] = useState<
    SocialPreferenceModel[]
  >([]);
  const [transportationPreferences, setTransportationPreferences] = useState<
    TransportationModel[]
  >([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

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

      const categoryRef = ref(database, `users/${auth.user.id}/categories`);
      get(categoryRef).then((snapshot) => {
        if (snapshot.exists()) {
          const categoryData: Record<string, CategoryModel> = snapshot.val();
          const categoryArray: CategoryModel[] = Object.values(categoryData);
          setCategories(categoryArray);
          console.log("Category Data: ", categoryData);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user, user?.homeAddress]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      height: "100vh",
      padding: "0 2rem",
      backgroundColor: "#f9faf6",
    },
    mapContainer: {
      height: "80vh",
    },
    scrollContainer: {
      overflow: "auto",
      maxHeight: "80vh",
      margin: 0,
    },
    exploreButton: {
      marginTop: "1rem",
      justifyContent: "space-between",
      gap: "0.5rem",
    },
    currentLocation: {
      position: "absolute" as "absolute",
      bottom: "13rem",
      right: "2.6rem",
      zIndex: 100,
      backgroundColor: "white",
    },
  };

  // const mockData: ExploreCardModel[] = [
  //   {
  //     title: "Home",
  //     place: "Home",
  //     address: "1234 Home St, Home City, Home State, 12345",
  //     confidence: 0.9,
  //     personalizedSummary:
  //       "You have been here 10 times. You have a 90% match level with this location.",
  //     reccomendationReasoning:
  //       "You have been here 10 times. You have a 90% match level with this location.",
  //     category: "Home",
  //   },
  //   {
  //     title: "Work",
  //     place: "Work",
  //     address: "1234 Work St, Work City, Work State, 12345",
  //     confidence: 0.8,
  //     personalizedSummary:
  //       "You have been here 5 times. You have a 80% match level with this location.",
  //     reccomendationReasoning:
  //       "You have been here 5 times. You have a 80% match level with this location.",
  //     category: "Work",
  //   },
  // ];

  return (
    <div style={styles.container}>
      <Typography
        variant="h3"
        sx={{ marginTop: "1rem", alignSelf: "center", fontWeight: "bold" }}
      >
        Explore
      </Typography>
      <Stack direction="row" justifyContent={"space-between"} p="0.5rem">
        <Typography variant="body1" sx={{ alignSelf: "end", maxWidth: "50%" }}>
          Your saved locations are the foundation of your nest. Engage with them
          - add new ones, leave comments, and explore. Together, we can
          transform any place into your home.
        </Typography>
      </Stack>
      <Stack direction="column" spacing={2} style={styles.scrollContainer}>
        {user &&
        addressParts.length &&
        categories.length &&
        transportationPreferences.length &&
        socialPreferences.length &&
        lifestylePreferences &&
        additionalInfo ? (
          categories.map((category, index) => (
            <ExploreCategory
              key={index}
              user={user}
              address={addressParts}
              category={category}
              transportationPreferences={transportationPreferences}
              socialPreferences={socialPreferences}
              lifestylePreferences={lifestylePreferences}
              additionalInfo={additionalInfo}
            />
          ))
        ) : (
          <div>
            Retrieving Your Information...
            <ul>
              <li>User data: {user ? "Loaded" : "Loading"}</li>
              <li>
                Address data: {addressParts.length ? "Loaded" : "Loading"}
              </li>
              <li>
                Categories data: {categories.length ? "Loaded" : "Loading"}
              </li>
              <li>
                Transportation preferences:{" "}
                {transportationPreferences.length ? "Loaded" : "Loading"}
              </li>
              <li>
                Social preferences:{" "}
                {socialPreferences.length ? "Loaded" : "Loading"}
              </li>
              <li>
                Lifestyle preferences:{" "}
                {lifestylePreferences ? "Loaded" : "Loading"}
              </li>
              <li>Additional info: {additionalInfo ? "Loaded" : "Loading"}</li>
            </ul>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default ExplorePage;
