import React from "react";

interface TransportationMethodItemProps {
  method: string;
  selected: boolean;
  radius: number;
  color: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransportationMethodItem: React.FC<TransportationMethodItemProps> = ({
  method,
  selected,
  radius,
  color,
  handleCheckboxChange,
  handleSliderChange,
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      marginBottom: "20px",
    },
    label: {
      color: color,
      fontWeight: "bold",
      marginBottom: "10px",
    },
    checkbox: {
      marginRight: "10px",
    },
    range: {
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
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
        step="0.1"
        max="10"
        name={method}
        value={radius}
        onChange={handleSliderChange}
        style={styles.range}
      />
      <label style={styles.label}>{radius} miles</label>
    </div>
  );
};

export default TransportationMethodItem;
