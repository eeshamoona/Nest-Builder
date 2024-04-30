import { Typography, Stack } from "@mui/material";
import React from "react";

const ExplorePage = () => {
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
    </div>
  );
};

export default ExplorePage;
