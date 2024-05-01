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

interface MyNestCardProps {
  location: SavedLocationModel;
  deleteLocationCallback: (location: SavedLocationModel) => void;
}

const MyNestCard = ({ location, deleteLocationCallback }: MyNestCardProps) => {
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [mapsLink, setMapsLink] = useState("https://www.google.com/maps");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-google-place-info?address=${encodeURIComponent(
            location.address
          )}&business_name=${encodeURIComponent(location.title)}`,
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
        } = await response.json();
        console.log("Found place ID", data.placeID);

        if (data.mapsLink) {
          setMapsLink(data.mapsLink);
        }
        if (data.photoURL) {
          setImageUrl(data.photoURL);
        }
      } catch (error) {
        console.error("Error fetching image from Google Places API:", error);
      }
    };

    if (location.address) {
      fetchImage();
    }
  }, [location]);

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

  return (
    <Paper elevation={1} style={styles.paper}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{location.title}</Typography>
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
        <Typography variant="body2">0.2 miles</Typography>
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
            variant="outlined"
          />
          <Stack direction="row" spacing={1} mt="0.5rem">
            <Typography variant="body2">My Rating:</Typography>
            <Rating name="rating" defaultValue={location.personalRating} />
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
