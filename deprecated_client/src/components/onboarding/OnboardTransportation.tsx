import React, { useCallback, useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { get, ref, set, update } from "firebase/database";
import { database } from "../../firebase.config";
import { TransportationModel } from "../../models/TransporationModel";
import TransportationMethodItem from "../TransportationMethodItem";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import GoogleAutocomplete from "react-google-autocomplete";
import GenerateWithGemini from "../GenerateWithGemini";
import { transportationPromptMarkdown } from "../../constants/OnboardingTooltipConstants";

type TransportationMethod = "walking" | "driving" | "biking" | "train" | "bus";

const OnboardTransportation = (props: OnboardPageProps) => {
  const auth = UserAuth();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [homeAddress, setHomeAddress] = useState<string>(
    "1 Microsoft Way, Redmond, WA 98052"
  );
  //TODO: Add min to max radius range in either ft or miles for each transportation method
  const [transportation, setTransportation] = useState({
    walking: { selected: false, radius: 0, color: "blue" },
    biking: { selected: false, radius: 0, color: "green" },
    driving: { selected: false, radius: 0, color: "orange" },
    bus: { selected: false, radius: 0, color: "red" },
    train: { selected: false, radius: 0, color: "purple" },
  });

  const circlesRef = useRef<google.maps.Circle[]>([]);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.name as TransportationMethod;
    setTransportation({
      ...transportation,
      [method]: {
        ...transportation[method],
        selected: event.target.checked,
      },
    });
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const target = event.target as HTMLInputElement;
    const method = target.name as TransportationMethod;
    setTransportation({
      ...transportation,
      [method]: {
        ...transportation[method],
        radius: Number(value),
      },
    });
  };

  const createCircles = useCallback(() => {
    if (mapInstance.current) {
      // Remove all existing circles from the map
      circlesRef.current.forEach((circle) => {
        circle.setMap(null);
      });

      // Clear the circles array
      circlesRef.current = [];

      // Create new circles for each transportation method
      Object.entries(transportation).forEach(
        ([method, { selected, radius, color }]) => {
          const transportationMethod = method as TransportationMethod;
          if (selected) {
            const circle = new google.maps.Circle({
              map: mapInstance.current,
              center: mapInstance.current?.getCenter(),
              radius: Number(radius) * 1609.34, // convert radius from miles to meters
              strokeColor: "#265728",
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: "#4caf50",
              fillOpacity: 0.1,
            });

            //Clear the label with the transportation method
            markersRef.current.forEach((marker) => {
              if (
                (marker.getLabel() as google.maps.MarkerLabel).text ===
                transportationMethod
              ) {
                marker.setMap(null);
              }
            });
            // Add the new circle to the circles array
            circlesRef.current.push(circle);

            const earthRadiusMeters = 6371000;
            const center = circle.getCenter() as google.maps.LatLng;
            const labelLat =
              center.lat() +
              ((radius * 1609.34) / earthRadiusMeters) * (180 / Math.PI);

            // Create a marker at the edge of the circle
            const marker = new google.maps.Marker({
              position: { lat: labelLat, lng: center.lng() },
              map: mapInstance.current,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 0,
                labelOrigin: new google.maps.Point(0, 0),
              },
              label: {
                text: transportationMethod,
                color: "#000821",
                fontSize: "14px",
                fontWeight: "bold",
              },
            });

            // Add the new marker to the markers array
            markersRef.current.push(marker);
          }
        }
      );
    }
  }, [transportation]);

  const goToAddress = useCallback(() => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: homeAddress }, (results, status) => {
      if (status === "OK" && results) {
        const location = results[0].geometry.location;
        mapInstance.current?.setCenter(location);

        new google.maps.marker.AdvancedMarkerElement({
          map: mapInstance.current,
          position: location,
          title: "Home Address",
        });
        createCircles();
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeAddress]);

  const saveData = useCallback(async () => {
    console.log("Save Data: ", { homeAddress, transportation });

    if (auth?.user) {
      const updates: TransportationModel[] = Object.entries(transportation).map(
        ([method, { selected, radius }]) => {
          return {
            method,
            selected,
            radius,
          };
        }
      );

      const updatePromises = updates.map((transportation) => {
        const transportationRef = ref(
          database,
          `users/${auth.user?.id}/transportations/${transportation.method}`
        );
        return set(transportationRef, transportation);
      });

      try {
        await Promise.all(updatePromises);

        const userRef = ref(database, `users/${auth.user.id}`);
        await update(userRef, { homeAddress });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  }, [auth?.user, homeAddress, transportation]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  useEffect(() => {
    if (auth?.user) {
      const transportationRef = ref(
        database,
        `users/${auth.user.id}/transportations`
      );
      get(transportationRef).then((snapshot) => {
        if (snapshot.exists()) {
          const transportationData = snapshot.val();
          console.log("Transportation Data: ", transportationData);

          setTransportation((prevState) => {
            const updatedTransportation: typeof transportation = {
              ...prevState,
            };

            Object.entries(transportationData).forEach(([key, value]) => {
              if (key in updatedTransportation && typeof value === "object") {
                updatedTransportation[
                  key as keyof typeof updatedTransportation
                ] = {
                  ...updatedTransportation[
                    key as keyof typeof updatedTransportation
                  ],
                  ...value,
                };
              }
            });

            return updatedTransportation;
          });
        }
      });

      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.homeAddress) {
            setHomeAddress(userData.homeAddress);
            goToAddress();
          }
        }
      });
    }

    if (mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 37.422, lng: -122.084 },
        zoom: 13,
        mapId: auth?.user?.id || "",
      };

      mapInstance.current = new google.maps.Map(mapRef.current, mapOptions);
      goToAddress();
    }
  }, [auth?.user, goToAddress]);

  useEffect(() => {
    createCircles();
  }, [createCircles, transportation]);

  const styles = {
    map: {
      width: "70vw",
      height: "60vh",
    },
    address: {
      display: "flex",
      flexDirection: "row" as "row",
      alignItems: "center",
      gap: "0.5rem",
    },
    input: {
      flex: 1,
    },
    sidebar: {
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column" as "column",
      borderRadius: "0.5rem",
      backgroundColor: "#F3F5EA",
    },
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginTop: "1rem", marginBottom: "2rem", textAlign: "center" }}
      >
        How Do You Like to Get Around?
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <Stack direction={"column"} spacing={2} sx={{ marginTop: "1rem" }}>
          <div style={styles.address}>
            {/* TODO: This text field is not editable, need to fix */}
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                inputComponent: ({ inputRef, ...other }) => (
                  <GoogleAutocomplete
                    {...other}
                    apiKey={process.env.REACT_APP_googleMapsAPIKey}
                    onPlaceSelected={(place: any) => {
                      if (place && "formatted_address" in place) {
                        console.log("Place: ", place.formatted_address);
                        setHomeAddress(place.formatted_address.toString());
                      } else {
                        console.log("No valid place selected");
                      }
                    }}
                    value={homeAddress}
                    onChange={(e: any) => {
                      console.log("Input: ", e.target.value);
                    }}
                    style={styles.input}
                    options={
                      {
                        types: ["address"],
                      } as google.maps.places.AutocompleteOptions
                    }
                  />
                ),
              }}
            />
          </div>
          <Paper style={styles.sidebar}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ fontWeight: "bold", margin: "1rem", marginBottom: 0 }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Transportation Methods
              </Typography>
              <GenerateWithGemini prompt={transportationPromptMarkdown} />
            </Stack>
            <Typography
              variant="body2"
              sx={{
                alignSelf: "center",
                margin: "1rem",
                marginTop: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              Select the transportation methods you use and how far you're
              willing to travel with each method. We'll use this information to
              help you find the best places to visit.
            </Typography>
            {Object.entries(transportation).map(
              ([method, { selected, radius }]) => {
                const transportationMethod = method as TransportationMethod;
                return (
                  <TransportationMethodItem
                    key={method}
                    method={method}
                    selected={selected}
                    radius={radius}
                    color={transportation[transportationMethod].color}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSliderChange={handleSliderChange}
                  />
                );
              }
            )}
          </Paper>
        </Stack>
        <div ref={mapRef} style={styles.map}></div>
      </Stack>
    </>
  );
};

export default OnboardTransportation;
