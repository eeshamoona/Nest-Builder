import React from "react";
import { TransportationModel } from "../models/TransporationModel";

interface TransportationCardProps {
  transportation: TransportationModel;
  onSelectedChange: (selected: boolean) => void;
  onRadiusChange: (radius: number) => void;
}

const TransportationCard = (props: TransportationCardProps) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center" as "center",
      justifyContent: "center" as "center",
      margin: "20px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    label: {
      fontSize: "14px",
      color: "#000",
    },
    checkbox: {
      margin: "10px",
    },
    range: {
      width: "100%",
    },
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSelectedChange(event.target.checked);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onRadiusChange(Number(event.target.value));
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        <input
          type="checkbox"
          name={props.transportation.method}
          checked={props.transportation.selected}
          onChange={handleCheckboxChange}
          style={styles.checkbox}
        />
        {props.transportation.method}
      </label>
      <input
        type="range"
        min="0"
        step="0.1"
        max="10"
        name={props.transportation.method}
        value={
          props.transportation.radius != null ? props.transportation.radius : ""
        }
        onChange={handleSliderChange}
        style={styles.range}
      />
      <label style={styles.label}>
        {props.transportation.radius != null ? props.transportation.radius : 0}{" "}
        miles
      </label>
    </div>
  );
};

export default TransportationCard;
