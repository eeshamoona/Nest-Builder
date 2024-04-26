import React from "react";
import { CategoryModel } from "../models/CategoryModel";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    margin: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "1.5em",
    color: "#333",
  },
  description: {
    fontSize: "1em",
    color: "#666",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  token: {
    display: "inline-block",
    margin: "5px",
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  confidence: {
    marginLeft: "10px",
    fontSize: "0.8em",
  },
};

const CategoryCard = (category: CategoryModel) => {
  return (
    <div style={styles.card}>
      <div style={styles.titleContainer}>
        <div style={styles.title}>{category.title}</div>
        <p style={styles.confidence}>
          <span style={styles.label}>AI Confidence:</span> {category.confidence}
        </p>
      </div>

      <p style={styles.description}>
        <span style={styles.label}>User Preferences:</span>{" "}
        {category.userPreferences}
      </p>
      <p style={styles.description}>
        <span style={styles.label}>Cost Preference:</span>{" "}
        {category.costPreference}
      </p>
      <p style={styles.description}>
        <span style={styles.label}>Environment Descriptors:</span>
        {category.environmentDescriptors.map((descriptor, index) => (
          <span key={index} style={styles.token}>
            {descriptor}
          </span>
        ))}
      </p>
      <p style={styles.description}>
        <span style={styles.label}>Related Subcategories:</span>
        {category.relatedSubcategories.map((subcategory, index) => (
          <span key={index} style={styles.token}>
            {subcategory}
          </span>
        ))}
      </p>
    </div>
  );
};

export default CategoryCard;
