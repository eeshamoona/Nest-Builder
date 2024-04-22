import React from "react";
import { OverlayView } from "@react-google-maps/api";

interface MapInfoCardProps {
  position: google.maps.LatLngLiteral;
  children: React.ReactNode;
  name: string;
  imageUri: string;
}

const styles = {
  card: {
    backgroundColor: "white",
    width: "300px",
    height: "150px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "10px",
    fontFamily: "Arial, sans-serif",
  },
  cover_image: {
    width: "100%",
    height: "40%",
    objectFit: "cover" as "cover",
  },
  title: {
    margin: "10px",
  },
  content: {
    margin: "10px",
  },
};

const MapInfoCard: React.FC<MapInfoCardProps> = ({ position, children, name, imageUri }) => {
  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} getPixelPositionOffset={getPixelPositionOffset}>
      <div style={styles.card}>
        <img style={styles.cover_image} src={imageUri}></img>
        <h1 style={styles.title}>{name}</h1>
        <div style={styles.content}>{children}</div>
      </div>
    </OverlayView>
  );
};

export default MapInfoCard;
