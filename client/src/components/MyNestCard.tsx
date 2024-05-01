import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { SavedLocationModel } from "../models/SaveLocationModel";
import {
  Typography,
  Box,
  Divider,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  FormHelperText,
  Rating,
} from "@mui/material";
import GenerateWithGemini from "./GenerateWithGemini";
import DeleteIcon from "@mui/icons-material/Delete";
import googleMapsIcon from "../assets/icons8-google-maps.svg";
import { UserAuth } from "../context/AuthContext";
import { ref, get, update } from "firebase/database";
import { database } from "../firebase.config";

interface MyNestCardProps {
  location: SavedLocationModel;
  deleteLocationCallback: (location: SavedLocationModel) => void;
}

const MyNestCard = ({ location, deleteLocationCallback }: MyNestCardProps) => {
  const auth = UserAuth();
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [mapsLink, setMapsLink] = useState("https://www.google.com/maps");
  const [distance, setDistance] = useState("N/A");
  const [duration, setDuration] = useState("N/A");

  useEffect(() => {
    const fetchImage = async () => {
      let tempHomeAddress = "1234 Main St, San Francisco, CA 94123";
      if (auth?.user) {
        const userRef = ref(database, `users/${auth.user.id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          tempHomeAddress = userData.homeAddress;
        }
      }

      try {
        const response = await fetch(
          `http://localhost:5000/get-google-place-info?address=${encodeURIComponent(
            location.address
          )}&place=${encodeURIComponent(
            location.place
          )}&home_address=${encodeURIComponent(tempHomeAddress)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data: {
          placeID: string;
          mapsLink: string;
          photoURL: string;
          distance: string;
          duration: string;
        } = await response.json();
        console.log("Found place ID", data.placeID);

        if (data.mapsLink) {
          setMapsLink(data.mapsLink);
        }
        if (data.photoURL) {
          setImageUrl(data.photoURL);
        }
        if (data.distance) {
          setDistance(data.distance);
        }
        if (data.duration) {
          setDuration(data.duration);
        }
      } catch (error) {
        console.error("Error fetching image from Google Places API:", error);
      }
    };

    if (location.address) {
      fetchImage();
    }
  }, [auth?.user, location]);

  const styles = {
    paper: {
      padding: "20px",
      margin: "10px 0",
      paddingBottom: "0.5rem",
      backgroundColor: "#F3F5EA",
    },
    boxFlex: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "space-between",
    },
  };

  const handleDelete = () => {
    deleteLocationCallback(location);
  };

  const handleChangeRating = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (auth?.user) {
      const nestRef = ref(database, `users/${auth.user.id}/nest/`);
      get(nestRef).then((snapshot) => {
        //find the location in the nest
        const locationData = snapshot.val();
        const locationArray = Object.values(
          locationData
        ) as SavedLocationModel[];
        const locationIndex = locationArray.findIndex(
          (loc: SavedLocationModel) => loc.place === location.place
        );
        const locationKey = Object.keys(locationData)[locationIndex];
        if (locationIndex >= 0) {
          const locationRef = ref(
            database,
            `users/${auth.user?.id}/nest/${locationKey}`
          );
          //update the rating
          const updates = {
            personalRating: newValue,
          };
          update(locationRef, updates);
        }
      });
    }
  };

  const handleChangeComment = (
    event: React.SyntheticEvent,
    newComment: string | null
  ) => {
    if (auth?.user) {
      const nestRef = ref(database, `users/${auth.user.id}/nest/`);
      get(nestRef).then((snapshot) => {
        //find the location in the nest
        const locationData = snapshot.val();
        const locationArray = Object.values(
          locationData
        ) as SavedLocationModel[];
        const locationIndex = locationArray.findIndex(
          (loc: SavedLocationModel) => loc.place === location.place
        );
        const locationKey = Object.keys(locationData)[locationIndex];
        if (locationIndex >= 0) {
          const locationRef = ref(
            database,
            `users/${auth.user?.id}/nest/${locationKey}`
          );
          //update the comment
          const updates = {
            comments: newComment,
          };
          update(locationRef, updates);
        }
      });
    }
  };

  return (
    <Paper elevation={1} style={styles.paper}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{location.place}</Typography>
        {location.place !== location.title && (
          <Typography variant="subtitle1">{location.title}</Typography>
        )}
        <Stack direction={"row"} spacing={1}>
          <Tooltip placement="top" title="Go to Google Maps">
            <IconButton
              href={mapsLink}
              target="_blank"
              color="success"
              sx={{
                height: "2.5rem",
                aspectRatio: 1,
              }}
            >
              <img
                src={googleMapsIcon}
                alt="Google Maps"
                style={{ width: "100%", height: "100%" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Delete saved location">
            <IconButton
              onClick={handleDelete}
              color="error"
              sx={{
                height: "2.5rem",
                aspectRatio: 1,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} mb="0.5rem">
        <Typography variant="body2">{location.address}</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2">{distance}</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2">{duration}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} mb="0.5rem">
        <Stack direction="column" spacing={0} style={{ flex: 1.5 }}>
          <Box style={styles.boxFlex}>
            <img
              src={imageUrl}
              alt="location"
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />{" "}
          </Box>
          <Typography variant="body2">
            {location.personalizedSummary}
          </Typography>
        </Stack>

        <Stack direction="column" style={{ flex: 1 }} m={0}>
          <TextField
            label="Comment"
            multiline
            placeholder="Add a comment about this place"
            rows={4}
            defaultValue={location.comments}
            onBlur={(event) => handleChangeComment(event, event.target.value)}
            variant="outlined"
          />
          <Stack direction="row" spacing={1} mt="0.5rem">
            <Typography variant="body2">My Rating:</Typography>
            <Rating
              onChange={(event, newValue) =>
                handleChangeRating(event, newValue)
              }
              name="rating"
              defaultValue={location.personalRating}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent={"space-between"}>
        <GenerateWithGemini prompt={location.reccomendationReasoning} />
        <FormHelperText style={{ fontSize: "10px", marginLeft: "2px" }}>
          Used to provide better recommendations
        </FormHelperText>
      </Stack>
    </Paper>
  );
};

export default MyNestCard;
