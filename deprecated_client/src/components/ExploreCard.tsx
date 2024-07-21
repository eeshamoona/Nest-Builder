import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Typography,
  Box,
  Divider,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import GenerateWithGemini from "./GenerateWithGemini";
import { ExploreCardModel } from "../models/ExploreCardModel";
import { get, push, ref } from "firebase/database";
import { database } from "../firebase.config";
import { UserAuth } from "../context/AuthContext";
import EggIcon from "@mui/icons-material/Egg";
import CheckIcon from "@mui/icons-material/Check";

interface ExploreCardProps {
  result: ExploreCardModel;
}

const ExploreCard = ({ result }: ExploreCardProps) => {
  const auth = UserAuth();
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [mapsLink, setMapsLink] = useState("https://www.google.com/maps");
  const [distance, setDistance] = useState("N/A");
  const [duration, setDuration] = useState("N/A");
  const [isAdded, setIsAdded] = useState(false);

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
            result.address
          )}&place=${encodeURIComponent(
            result.place
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
          console.log("Distance:", data.distance);
          setDistance(data.distance);
        }
        if (data.duration) {
          console.log("Duration:", data.duration);
          setDuration(data.duration);
        }
      } catch (error) {
        console.error("Error fetching image from Google Places API:", error);
      }
    };

    if (result.address) {
      fetchImage();
    }
  }, [auth?.user, result]);

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

  const handleAddToNest = () => {
    if (auth?.user) {
      const nestRef = ref(database, `users/${auth.user?.id}/nest`);
      push(nestRef, {
        title: result.title,
        place: result.place,
        address: result.address,
        personalizedSummary: result.personalizedSummary,
        reccomendationReasoning: result.reccomendationReasoning,
        comments: "",
        personalRating: 0,
        category: result.category,
      });
      setIsAdded(true);
    }
  };

  return (
    <Paper elevation={1} style={styles.paper}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography variant="h6">{result.place}</Typography>
        {result.place !== result.title && (
          <Typography variant="subtitle1">{result.title}</Typography>
        )}
        <Stack direction={"row"} spacing={1}></Stack>
      </Stack>
      <Stack direction="row" spacing={1} mb="0.5rem">
        <Typography variant="body2">{result.address}</Typography>
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
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems={"center"}
            mb={1}
          >
            <Typography variant="h5">
              {result.confidence} Match Level
            </Typography>
            <Link
              href={mapsLink}
              target="_blank"
              sx={{ color: "success.main", fontSize: "1rem" }}
            >
              Open in Google Maps
            </Link>
          </Stack>
          <Typography variant="body2">{result.personalizedSummary}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent={"space-between"}>
        <GenerateWithGemini prompt={result.reccomendationReasoning} />
        <IconButton onClick={handleAddToNest} color="success">
          {isAdded ? <CheckIcon /> : <EggIcon />}
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ExploreCard;
