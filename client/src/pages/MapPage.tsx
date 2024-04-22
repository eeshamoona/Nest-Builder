import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, OverlayView } from "@react-google-maps/api";
import { UserAuth } from "../context/AuthContext";
import MapInfoCard from "../components/MapInfoCard";

const MapPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const styles = {
    container: {
      margin: "1rem",
    },
    profileContainer: {
      display: "flex",
      gap: "1rem",
      margin: "10px",
    },
    title: { color: "black" },
    arrowButton: {
      padding: "10px",
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "5px",
      cursor: "pointer",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "start",
      gap: "1rem",
    },

    mapContainerStyle: {
      width: "800px",
      height: "800px",
    },
    infoWindowStyle: {
      width: "300px",
      height: "100px",
      backgroundColor: "white",
    },
  };

  const [isHovering, setIsHovering] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_mapsApiKey!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <button onClick={goBack} style={styles.arrowButton}>
          &larr;
        </button>
        <h1 style={styles.title}>Map</h1>
      </div>
      <div>
        {isLoaded ? (
          <GoogleMap mapContainerStyle={styles.mapContainerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
            {/* Child components, such as markers, info windows, etc. */}
            <></>
            <Marker position={center} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
              {isHovering && (
                <MapInfoCard position={center} name="Test" imageUri="https://st.depositphotos.com/2288675/2453/i/450/depositphotos_24536079-stock-photo-pushpin-on-map.jpg">
                  <div>Test</div>
                </MapInfoCard>
              )}
            </Marker>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MapPage;
