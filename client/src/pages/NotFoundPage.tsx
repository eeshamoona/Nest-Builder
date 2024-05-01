import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      boxSizing: "border-box" as "border-box",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1>404: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        style={styles.button}
        onClick={() => navigate("/", { replace: true })}
      >
        Go back to the landing page
      </button>
    </div>
  );
};

export default NotFoundPage;
