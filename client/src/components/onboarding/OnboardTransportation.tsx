import React, { useCallback, useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { get, ref, set, update } from "firebase/database";
import { database } from "../../firebase.config";
import { TransportationModel } from "../../models/TransporationModel";
import TransportationMethodItem from "../TransportationMethodItem";
import { Paper } from "@mui/material";

type TransportationMethod = "walking" | "driving" | "biking" | "train" | "bus";

const OnboardTransportation = (props: OnboardPageProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [homeAddress, setHomeAddress] = useState(
    "1600 Amphitheatre Parkway, Mountain View, CA"
  );
  const auth = UserAuth();

  //TODO: Add min to max radius range in either ft or miles for each transportation method
  const [transportation, setTransportation] = useState({
    walking: { selected: false, radius: 0, color: "blue" },
    biking: { selected: false, radius: 0, color: "green" },
    driving: { selected: false, radius: 0, color: "orange" },
    bus: { selected: false, radius: 0, color: "red" },
    train: { selected: false, radius: 0, color: "purple" },
  });

  const circlesRef = useRef<google.maps.Circle[]>([]);

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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.name as TransportationMethod;
    setTransportation({
      ...transportation,
      [method]: {
        ...transportation[method],
        radius: Number(event.target.value),
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
              strokeColor: transportation[transportationMethod].color,
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillColor: transportation[transportationMethod].color,
              fillOpacity: 0.15,
            });

            // Add the new circle to the circles array
            circlesRef.current.push(circle);
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
    //TODO: Get user's home address from the database
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
    container: {
      display: "flex",
      flexDirection: "row" as "row",
      alignItems: "center",
    },
    map: {
      width: "50vw",
      height: "50vh",
    },
    address: {
      display: "flex",
      flexDirection: "row" as "row",
      alignItems: "center",
      marginBottom: "20px",
      gap: "0.5rem",
      width: "100%",
    },
    input: {
      flex: 1,
    },
    innerContainer: {
      display: "flex",
      flexDirection: "column" as "column",
    },
    sidebar: {
      marginLeft: "1rem",
      padding: " 0 1rem",
      height: "100%",
    },
    label: (color: string) => ({
      display: "block",
      color: color,
    }),
    checkbox: {
      marginRight: "10px",
    },
    range: {
      width: "100%",
      display: "block",
      marginBottom: "10px",
    },
  };

  return (
    <>
      <h1>Onboard Transportation</h1>

      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <div style={styles.address}>
            <label htmlFor="homeAddress">Home Address</label>
            <input
              type="text"
              style={styles.input}
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
            <button onClick={goToAddress}>Go</button>
          </div>

          <div ref={mapRef} style={styles.map}></div>
        </div>
        <Paper style={styles.sidebar}>
          <h3>Transportation Methods</h3>
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
      </div>
    </>
  );
};

export default OnboardTransportation;
