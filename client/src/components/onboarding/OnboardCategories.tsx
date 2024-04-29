import React, { useCallback, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase.config";
import { ref, get } from "firebase/database";
import CategoryCard from "../CategoryCard";
import { CategoryModel } from "../../models/CategoryModel";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AddIcon from "@mui/icons-material/Add";

const GEMINI_LIFESTYLE_PARAGRAPH_INSTRUCTIONS: string = `Act as a data scientist with expertise in Google APIs, particularly Google Maps and Places. Your primary role is to analyze and interpret user search data to create a profile focusing on transportation habits. Adopt a supportive, trustworthy, and approachable demeanor, using your strong analytical capabilities and understanding of user behavior to deliver precise results. Construct a first-person narrative describing the user's daily activities, community engagement, social settings, and lifestyle preferences in a personal, conversational tone`;

const OnboardCategories = (props: OnboardPageProps) => {
  const [originalProfileData, setOriginalProfileData] = React.useState<
    CategoryModel[]
  >([]);
  const auth = UserAuth();

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
          setOriginalProfileData(categoriesArray);
        }
      }
    };

    fetchCategories();
  }, [auth?.user]);

  const saveData = useCallback(() => {
    console.log("Need to still save categories: ", { originalProfileData });
  }, [originalProfileData]);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
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
  };

  const handleAddNewCategory = () => {
    console.log("Add new category");
  };

  const handleDeleteCategory = (category: CategoryModel) => {
    console.log("Delete category: ", category);
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Categories
      </Typography>
      <Typography variant="body1" gutterBottom>
        These are the categories we believe you would be interested, feel free
        to edit or add more
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={GEMINI_LIFESTYLE_PARAGRAPH_INSTRUCTIONS}
          placement="right"
          arrow
        >
          <InfoRoundedIcon />
        </Tooltip>
        <IconButton onClick={handleAddNewCategory} color="success">
          <AddIcon />
        </IconButton>
      </div>
      <div style={styles.profileContainer}>
        <div style={styles.scrollableContainer}>
          <Grid container spacing={2}>
            {originalProfileData
              .sort((a, b) => b.confidence - a.confidence)
              .map((category) => (
                <Grid item xs={12} sm={6} key={category.title}>
                  <CategoryCard
                    key={category.title}
                    categoryProp={category}
                    deleteCategoryCallback={handleDeleteCategory}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default OnboardCategories;
