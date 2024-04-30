import React from "react";
import { ResultModel } from "../models/ResultModel";

const ResultCard = (result: ResultModel) => {
  const styles = {
    container: {
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "10px",
      margin: "10px 0",
      transition: "0.3s",
      ":hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
      },
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    details: {
      fontSize: "16px",
      padding: "5px 0",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{result.title}</div>
      <div style={styles.details}>Place: {result.place}</div>
      <div style={styles.details}>Location: {result.location}</div>
      <div style={styles.details}>Cost: {result.cost}</div>
      <div style={styles.details}>
        Star Review Rating: {result.starReviewRating}
      </div>
      <div style={styles.details}>
        Personalized Summary: {result.personalizedSummary}
      </div>
      <div style={styles.details}>
        Final Recommendation: {result.finalRecommendation}
      </div>
    </div>
  );
};

export default ResultCard;
