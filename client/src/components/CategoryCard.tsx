import React from "react";
import { CategoryModel } from "../models/CategoryModel";
import { Chip, Grid, Paper, Stack, Typography } from "@mui/material";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    margin: "20px",
    backgroundColor: "#F3F5EA",
  },
};

const CategoryCard = (category: CategoryModel) => {
  return (
    <Paper style={styles.card}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">{category.title}</Typography>
        <Typography variant="h5">{category.costPreference}</Typography>
      </Stack>
      <Typography mt={"1rem"} mb={"1rem"} variant="body1">
        {category.userPreferences}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} width="50%">
          <Typography variant="body1">Subcategories</Typography>
          <Grid container>
            {category.relatedSubcategories.map((subcategory, index) => (
              <Grid item xs={4} key={index}>
                <Chip label={subcategory} style={{ margin: "5px" }} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack direction={"column"} justifyContent={"end"}>
          <Typography variant="body1">Vibes</Typography>
          {category.environmentDescriptors.map((descriptor, index) => (
            <Chip
              key={index}
              color="success"
              label={descriptor}
              style={{ margin: "5px" }}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
