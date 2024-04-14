import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../models/CategoryModel";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<CategoryModel[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (auth?.user) {
        const categoriesRef = ref(database, `users/${auth.user.id}/categories`);
        const categoriesSnapshot = await get(categoriesRef);
        const categoriesData = categoriesSnapshot.val();

        if (categoriesData) {
          const categoriesArray = Object.entries(categoriesData).map(
            ([id, category]) => ({
              ...(category as CategoryModel),
              id,
            })
          );
          setCategories(categoriesArray);
        }
      }
    };

    fetchCategories();
  }, [auth?.user]);

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
      display: "flex",
      flexDirection: "row" as "row",
      flexWrap: "wrap" as "wrap",
      justifyContent: "space-between",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "200px",
      height: "200px",
      margin: "10px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      textDecoration: "none",
      color: "black",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // add box shadow for depth
      transition: "0.3s", // add transition for smooth hover effects
      "&:hover": {
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // increase box shadow on hover
        transform: "scale(1.05)", // slightly increase size on hover
      },
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

      <div style={styles.list}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              to={`/search-prompt/${category.title}`}
              style={styles.card}
              key={category.title}
            >
              <div style={styles.listItem}>{category.title}</div>
            </Link>
          ))
        ) : (
          <div style={styles.noCategories}>No Categories Found</div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
