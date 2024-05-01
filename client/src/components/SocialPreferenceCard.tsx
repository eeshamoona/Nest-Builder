import React from "react";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";

interface SocialPreferenceCardProps {
  socialPreference: SocialPreferenceModel;
  onSelect: (selected: boolean) => void;
}

const SocialPreferenceCard = (props: SocialPreferenceCardProps) => {
  const styles = {
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
    buttonSelected: {
      backgroundColor: "#6c757d",
    },
  };

  const buttonStyle = props.socialPreference.selected
    ? styles.button
    : { ...styles.button, ...styles.buttonSelected };

  return (
    <div>
      <h1>{props.socialPreference.name}</h1>
      <p>{props.socialPreference.description}</p>
      <button
        style={buttonStyle}
        onClick={() => props.onSelect(!props.socialPreference.selected)}
      >
        {props.socialPreference.selected ? "Selected" : "Not Selected"}
      </button>
    </div>
  );
};

export default SocialPreferenceCard;
