import React from "react";
import { Checkbox, Slider, Typography, Grid } from "@mui/material";

interface TransportationMethodItemProps {
  method: string;
  selected: boolean;
  radius: number;
  color: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (event: Event, value: number | number[]) => void;
}

const TransportationMethodItem: React.FC<TransportationMethodItemProps> = ({
  method,
  selected,
  radius,
  color,
  handleCheckboxChange,
  handleSliderChange,
}) => {
  return (
    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={1} justifyContent={"space-between"}>
        <Checkbox
          checked={selected}
          onChange={handleCheckboxChange}
          name={method}
          color="success"
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{method}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Slider
          value={radius}
          onChange={handleSliderChange}
          min={0}
          step={0.1}
          color="success"
          max={radius > 10 ? radius : 10}
          name={method}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{radius} miles</Typography>
      </Grid>
    </Grid>
  );
};

export default TransportationMethodItem;
