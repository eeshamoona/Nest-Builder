import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const CategoriesPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    if (auth?.user) {
      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef).then((snapshot) => {
        const data = snapshot.val();
        if (!data || !data.categories) {
          return;
        }
        setCategories(data.categories);
      });
    }
  }, [auth]);

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
    title: {
      marginBottom: "20px",
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
    secondaryButton: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#6C757D",
      color: "white",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    list: {
      listStyleType: "none",
      paddingLeft: "0",
      width: "100%",
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
    },
    listItem: {
      marginBottom: "10px",
      fontSize: "18px",
      width: "100%",
      textAlign: "center" as "center",
    },
    noCategories: {
      color: "red",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Categories</h1>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => navigate("/user-profile")}
          style={styles.secondaryButton}
        >
          Check My Profile
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/search-prompt")}
        >
          Try a Search Prompt
        </button>
      </div>
      {categories.length > 0 ? (
        <ul style={styles.list}>
          {categories.map((category) => (
            <li key={category.id} style={styles.listItem}>
              {category.name}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noCategories}>No categories found</p>
      )}
    </div>
  );
};

export default CategoriesPage;
