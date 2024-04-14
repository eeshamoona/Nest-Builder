import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileData,
  transformApiResponse,
} from "../services/UserProfileServices";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase.config";
import { ref, set } from "firebase/database";
import { CategoryModel } from "../models/CategoryModel";
import CategoryCard from "../components/CategoryCard";

const UserProfilePage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = React.useState<CategoryModel[]>([]);

  const goBack = () => {
    navigate(-1);
  };

  const styles = {
    container: { margin: "20px" },
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
    subtitle: { marginTop: "20px", color: "gray" },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
    },
    fileUploadContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "start",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#f8f8f8",
      borderRadius: "5px",
    },
    label: {
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    fileInput: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    preText: {
      width: "100%",
      textWrap: "pretty" as "pretty",
    },
    buttonContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "row" as "row",
      justifyContent: "space-between",
    },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !file.name.endsWith(".txt")) {
      alert("Please select a .txt file");
      event.target.value = "";
    }
  };

  const uploadFile = async () => {
    setLoading(true);

    const file = fileInput.current?.files?.[0];
    if (!fileInput.current || !file) {
      console.log("No file selected");
      alert("Please select a file");
      setLoading(false);
      return;
    }

    try {
      const data = await getProfileData(file);
      if (!data) {
        console.error("Error: No data found");
        setLoading(false);
        return;
      }

      const newCateogries = transformApiResponse(data);
      setProfileData(newCateogries);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategories = () => {
    console.log("Saving categories");
    if (!auth?.user) {
      console.error("Error: User not found");
      return;
    }

    const db = database;
    profileData.forEach((category) => {
      const categoryRef = ref(
        db,
        `users/${auth.user?.id}/categories/${category.title}`
      );
      set(categoryRef, category);
    });

    console.log("Categories saved");
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <button onClick={goBack} style={styles.arrowButton}>
          &larr;
        </button>
        <h1 style={styles.title}>User Profile</h1>
      </div>
      <div style={styles.fileUploadContainer}>
        <label htmlFor="googleTakeoutData" style={styles.label}>
          Google Takeout My Activity Data:{" "}
        </label>
        <input
          type="file"
          ref={fileInput}
          id="googleTakeoutData"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={uploadFile}>
            Upload
          </button>
          <button
            style={styles.button}
            onClick={handleSaveCategories}
            hidden={profileData.length === 0}
          >
            Save
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <progress value={undefined} />
        </div>
      ) : (
        profileData.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))
      )}
    </div>
  );
};

export default UserProfilePage;
