import React, { useCallback, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase.config";
import { ref, get } from "firebase/database";
import CategoryCard from "../CategoryCard";
import { CategoryModel } from "../../models/CategoryModel";
import { OnboardPageProps } from "../../models/OnboardPageProps";

const OnboardCategories = (props: OnboardPageProps) => {
  const [originalProfileData, setOriginalProfileData] = React.useState<
    CategoryModel[]
  >([]);
  const auth = UserAuth();
  useEffect(() => {
    //TODO: instead of getting categories from the backend get it from the file uploaded
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
          setOriginalProfileData(categoriesArray);
        }
      }
    };

    fetchCategories();
  }, [auth?.user]);

  const saveData = useCallback(() => {
    // Save data logic here...
    console.log("Save Data: ", { originalProfileData });
  }, [originalProfileData]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "space-between",
      padding: "20px",
      alignItems: "center",
      height: "80vh",
    },
    profileContainer: {
      display: "flex",
      gap: "1rem",
      height: "80%",
      margin: "10px",
    },
    scrollableContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      gap: "1rem",
      overflowY: "auto" as "auto",
    },
    progressBar: {
      margin: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Onboard Categories</h1>
      <div style={styles.profileContainer}>
        <div style={styles.scrollableContainer}>
          {originalProfileData
            .sort((a, b) => b.confidence - a.confidence)
            .map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardCategories;
