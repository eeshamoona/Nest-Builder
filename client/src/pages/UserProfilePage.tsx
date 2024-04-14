import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../services/UserProfileServices";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = React.useState<any>(null);

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

    if (!fileInput.current || fileInput.current.files?.length === 0) {
      console.log("No file selected");
      return;
    }

    const file = fileInput.current.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const data = await getProfileData(file);
      setProfileData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        <button style={styles.button} onClick={uploadFile}>
          Upload
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <progress value={undefined} />
        </div>
      ) : (
        profileData && (
          <div>
            <h2 style={styles.subtitle}>Profile Details</h2>
            <pre style={styles.preText}>{profileData}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfilePage;
