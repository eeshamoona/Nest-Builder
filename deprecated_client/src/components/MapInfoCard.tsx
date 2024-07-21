import React from "react";
import { OverlayView } from "@react-google-maps/api";
import { Card, CardContent, Typography } from "@mui/material";

interface MapInfoCardProps {
  position: google.maps.LatLngLiteral;
  name: string;
  description: string;
}

const MapInfoCard = ({ position, name, description }: MapInfoCardProps) => {
  console.log("MapInfoCard props:", { position, name, description });

  const getPixelPositionOffset = (width: number, height: number) => {
    const offset = { x: -(width / 2), y: -height };
    console.log("getPixelPositionOffset result:", offset);
    return offset;
  };

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Card
        sx={{
          zIndex: 1000, // Increased z-index
          backgroundColor: "white", // Added background color
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </OverlayView>
  );
};

export default MapInfoCard;
