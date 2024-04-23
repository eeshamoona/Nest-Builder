import React, { useCallback, useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { OnboardPageProps } from "../../models/OnboardPageProps";

type TransportationMethod = "car" | "bike" | "publicTransport" | "walking";

const OnboardTransportation = (props: OnboardPageProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [homeAddress, setHomeAddress] = useState(
    "1600 Amphitheatre Parkway, Mountain View, CA"
  );
  const auth = UserAuth();

  //TODO: Add min to max radius range in either ft or miles for each transportation method
  const [transportation, setTransportation] = useState({
    car: { selected: false, radius: 0, color: "yellow" },
    bike: { selected: false, radius: 0, color: "green" },
    publicTransport: { selected: false, radius: 0, color: "red" },
    walking: { selected: false, radius: 0, color: "blue" },
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

  const goToAddress = () => {
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
  };

  const saveData = useCallback(() => {
    // Save data logic here...
    console.log("Save Data: ", { homeAddress, transportation });
  }, [homeAddress, transportation]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  useEffect(() => {
    //TODO: Get user's home address from the database
    if (mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 37.422, lng: -122.084 },
        zoom: 15,
        mapId: auth?.user?.id || "",
      };

      mapInstance.current = new google.maps.Map(mapRef.current, mapOptions);
      goToAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      height: "100%",
      backgroundColor: "lightgray",
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
        <div style={styles.sidebar}>
          <h5>Transportation Methods</h5>
          {Object.entries(transportation).map(
            ([method, { selected, radius }]) => {
              const transportationMethod = method as TransportationMethod;
              return (
                <div key={method} style={styles.container}>
                  <label
                    style={styles.label(
                      transportation[transportationMethod].color
                    )}
                  >
                    <input
                      type="checkbox"
                      name={method}
                      checked={selected}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    {method}
                  </label>
                  <input
                    type="range"
                    min="0"
                    step={0.1}
                    max="10"
                    name={method}
                    value={radius}
                    onChange={handleSliderChange}
                    style={styles.range}
                  />
                  <label
                    style={styles.label(
                      transportation[transportationMethod].color
                    )}
                  >
                    {radius} miles
                  </label>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardTransportation;
