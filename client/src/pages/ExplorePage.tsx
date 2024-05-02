import { Typography, Stack, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { ref, get } from "firebase/database";
import { database } from "../firebase.config";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
import { TransportationModel } from "../models/TransporationModel";
import User from "../models/UserModel";
import { CategoryModel } from "../models/CategoryModel";
import ExploreCategory from "../components/ExploreCategory";
import GenerateWithGemini from "../components/GenerateWithGemini";
import EggIcon from "@mui/icons-material/Egg";
import { useNavigate } from "react-router-dom";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import NestedLogo from "../assets/nested-logo.png";
import { explorePromptMarkdown } from "../constants/OnboardingTooltipConstants";

const ExplorePage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
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
  const [loadingIndex, setLoadingIndex] = useState(0);

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
    nestButton: {
      position: "fixed" as "fixed",
      bottom: "2rem",
      right: "2rem",
      width: "fit-content" as "fit-content",
      padding: "0.5rem",
      fontSize: "1rem",
      paddingRight: "1rem",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          left: "2rem",
        }}
      >
        <img
          src={NestedLogo}
          alt="Nested Logo"
          style={{ width: "5rem", height: "5rem" }}
        />{" "}
      </Box>
      <Typography
        variant="h3"
        sx={{ marginTop: "1rem", alignSelf: "center", fontWeight: "bold" }}
      >
        Explore
      </Typography>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        m="0.5rem"
        mt="1rem"
      >
        <Button
          variant="outlined"
          color="success"
          startIcon={<FaceRetouchingNaturalIcon />}
          onClick={() => navigate("/onboarding/intro")}
        >
          Edit My Profile
        </Button>
        <Typography variant="body1">
          Nested believes these places are a good fit for your lifestyle, read
          the explanation to see why!
        </Typography>
        <GenerateWithGemini prompt={explorePromptMarkdown} />
      </Stack>

      <Stack direction="column" spacing={2} style={styles.scrollContainer}>
        {user &&
        addressParts.length &&
        categories.length &&
        transportationPreferences.length &&
        socialPreferences.length &&
        lifestylePreferences &&
        additionalInfo ? (
          <>
            {categories.slice(0, loadingIndex + 1).map((category, index) => (
              <ExploreCategory
                key={index}
                user={user}
                address={addressParts}
                category={category}
                transportationPreferences={transportationPreferences}
                socialPreferences={socialPreferences}
                lifestylePreferences={lifestylePreferences}
                additionalInfo={additionalInfo}
                onLoadComplete={() =>
                  setLoadingIndex((prevIndex) => prevIndex + 1)
                }
              />
            ))}
          </>
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
      <Button
        color="success"
        variant="contained"
        aria-label="Go to my nest"
        style={styles.nestButton}
        onClick={() => navigate("/my-nest")}
      >
        <EggIcon style={{ fontSize: "2rem", marginRight: "10px" }} />
        Go To My Nest
      </Button>
    </div>
  );
};

export default ExplorePage;
