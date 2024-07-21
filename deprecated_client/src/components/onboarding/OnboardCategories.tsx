import React, { useCallback, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase.config";
import { ref, get, remove } from "firebase/database";
import CategoryCard from "../CategoryCard";
import { CategoryModel } from "../../models/CategoryModel";
import { OnboardPageProps } from "../../models/OnboardPageProps";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GenerateWithGemini from "../GenerateWithGemini";
import { categoriesPromptMarkdown } from "../../constants/OnboardingTooltipConstants";

const OnboardCategories = (props: OnboardPageProps) => {
  const [categories, setCategories] = React.useState<
    {
      category: CategoryModel;
      editMode: boolean;
    }[]
  >([]);
  const auth = UserAuth();

  const fetchCategories = useCallback(async () => {
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
        setCategories(
          categoriesArray.map((category) => ({
            category,
            editMode: false,
          }))
        );
      }
    }
  }, [auth?.user]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // TODO: Might not need this as each card handles save on their own, this might be helpful for letting the search page know to start generating results...
  const saveData = useCallback(() => {
    console.log(
      "Do we need to save anything here before going to the search page?"
    );
  }, []);

  useEffect(() => {
    props.registerSave(saveData);
  }, [props, props.registerSave, saveData]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      height: "100%",
    },
    profileContainer: {
      display: "flex",
      gap: "1rem",
      overflowY: "auto" as "auto",
      maxHeight: "100%",
    },
    scrollableContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      gap: "1rem",
    },
  };

  const handleAddNewCategory = () => {
    setCategories([
      ...categories,
      {
        category: {
          title: "",
          userPreferences: "",
          environmentDescriptors: [],
          relatedSubcategories: [],
          costPreference: "",
          confidence: 0,
        },
        editMode: true,
      },
    ]);
  };
  const handleDeleteCategory = (category: CategoryModel) => {
    if (auth?.user) {
      const categoryRef = ref(
        database,
        `users/${auth.user.id}/categories/${category.title}`
      );
      get(categoryRef).then((snapshot) => {
        if (snapshot.exists()) {
          remove(categoryRef).then(() => {
            fetchCategories();
          });
        }
      });
    }
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
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        <GenerateWithGemini prompt={categoriesPromptMarkdown} />
        <IconButton onClick={handleAddNewCategory} color="success">
          <AddIcon />
        </IconButton>
      </Stack>
      <div style={styles.profileContainer}>
        <div style={styles.scrollableContainer}>
          <Grid container spacing={2}>
            {categories
              .sort((a, b) => b.category.confidence - a.category.confidence)
              .map((category) => (
                <Grid item xs={12} sm={6} key={category.category.title}>
                  <CategoryCard
                    key={category.category.title}
                    categoryProp={category.category}
                    deleteCategoryCallback={handleDeleteCategory}
                    editModeProp={category.editMode}
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
