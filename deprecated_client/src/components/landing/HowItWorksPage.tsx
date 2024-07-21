import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const HowItWorksPage = () => {
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Grid container spacing={2} sx={{ padding: "2rem" }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          How it Works
        </Typography>
        {/* TODO: Make each of these steps go to the part of the demo that it corresponds */}
        <List>
          <ListItem>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Connect your Google Account for a seamless onboarding
                  experience.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Search for any type of place you'd like to explore in your new
                  city – gyms, restaurants, museums, and more!
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Discover hidden gems and save your favorite places to build
                  your perfect Nest.
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6} textAlign={"center"}>
        <YouTube
          videoId={`Qyf--S0LUlk`}
          title={"Nested Demo Video"}
          opts={opts}
        />
      </Grid>
    </Grid>
  );
};

export default HowItWorksPage;
