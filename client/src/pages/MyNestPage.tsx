import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SavedLocationModel } from "../models/SaveLocationModel";
import MyNestCard from "../components/MyNestCard";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase.config";
import { get, ref } from "firebase/database";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const defaultSavedLocations: SavedLocationModel[] = [
  // Parks
  {
    title: "Millennium Park",
    address: "Chicago, IL 60602",
    personalizedSummary:
      "Beautiful park with art installations, gardens, and events.",
    reccomendationReasoning: "You like to be around nature and art.",
    comments: "Great place to relax and enjoy the city.",
    personalRating: 4,
    category: "Park",
  },
  {
    title: "Lincoln Park",
    address: "2430 N Cannon Dr, Chicago, IL 60614",
    personalizedSummary:
      "Something for everyone, with animals, nature, and lake views.",
    reccomendationReasoning: "You enjoy a variety of activities.",
    comments:
      "Great for a day trip with the zoo, conservatory, and lakefront access.",
    personalRating: 5,
    category: "Park",
  },

  // Grocery Stores
  {
    title: "Trader Joe's",
    address: "44 E Ontario St, Chicago, IL 60611",
    personalizedSummary: "Great deals on groceries and unique finds.",
    reccomendationReasoning: "You like to find unique products.",
    comments: "Love their unique products and affordable prices.",
    personalRating: 5,
    category: "Grocery",
  },
];

const MyNestPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [homeAddress, setHomeAddress] = useState<string>(
    "1600 Amphitheatre Parkway, Mountain View, CA"
  );

  useEffect(() => {
    if (auth?.user) {
      const userId = auth.user.id;
      const userRef = ref(database, `users/${userId}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.homeAddress) {
            setHomeAddress(userData.homeAddress);
          }
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    if (mapRef.current && homeAddress) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 37.422, lng: -122.084 },
        zoom: 13,
        mapId: "Saved Locations",
      };

      mapInstance.current = new google.maps.Map(mapRef.current, mapOptions);

      const geocoder = new google.maps.Geocoder();

      // Plot home address
      geocoder.geocode({ address: homeAddress }, (results, status) => {
        if (status === "OK" && results) {
          const location = results[0].geometry.location;
          mapInstance.current?.setCenter(location);
          new google.maps.marker.AdvancedMarkerElement({
            map: mapInstance.current,
            position: location,
            title: "Home Address",
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });

      // Plot default saved locations
      defaultSavedLocations.forEach((savedLocation) => {
        geocoder.geocode(
          { address: savedLocation.address },
          (results, status) => {
            if (status === "OK" && results) {
              const location = results[0].geometry.location;
              new google.maps.marker.AdvancedMarkerElement({
                map: mapInstance.current,
                position: location,
                title: savedLocation.title,
              });
            }
          }
        );
      });
    }
  }, [homeAddress]);

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

  const categories = Array.from(
    new Set(defaultSavedLocations.map((location) => location.category))
  ).sort();

  const deleteLocation = (location: SavedLocationModel) => {
    console.log("Delete Location: ", location);
  };
  const handleCenterClick = () => {
    if (mapInstance.current) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: homeAddress }, (results, status) => {
        if (status === "OK" && results) {
          const location = results[0].geometry.location;
          mapInstance.current?.panTo(location);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }
  };

  return (
    <div style={styles.container}>
      <Box
        onClick={() => navigate("/dashboard")}
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          cursor: "pointer",
        }}
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </Box>
      <Typography
        variant="h3"
        sx={{ marginTop: "1rem", alignSelf: "center", fontWeight: "bold" }}
      >
        Your Nest
      </Typography>
      <Stack direction="row" justifyContent={"space-between"} p="0.5rem">
        <Typography variant="body1" sx={{ alignSelf: "end", maxWidth: "50%" }}>
          Your saved locations are the foundation of your nest. Engage with them
          - add new ones, leave comments, and explore. Together, we can
          transform any place into your home.
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          height={"100%"}
          justifyContent={"end"}
        >
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Typography variant="h6">Looking for New Places?</Typography>

            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/search-prompt")}
              sx={styles.exploreButton}
            >
              <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                Go to Explore
              </Typography>{" "}
              <EastIcon fontSize="inherit" sx={{ fontSize: "0.75rem" }} />
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div style={styles.scrollContainer}>
            {categories.map((category) => (
              <Accordion
                key={category}
                defaultExpanded={true}
                disableGutters
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  margin: "0.25rem",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {defaultSavedLocations
                    .filter((location) => location.category === category)
                    .map((location) => (
                      <MyNestCard
                        key={location.title}
                        location={location}
                        deleteLocationCallback={deleteLocation}
                      />
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={2}>
            <div ref={mapRef} style={styles.mapContainer}></div>
            <IconButton
              onClick={handleCenterClick}
              color="primary"
              style={styles.currentLocation}
            >
              <MyLocationIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyNestPage;
