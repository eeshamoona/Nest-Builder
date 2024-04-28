import React from "react";
import { CategoryModel } from "../models/CategoryModel";
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
        <Stack direction={"row"} spacing={2}>
          <Typography variant="h5">{category.title}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h5">{category.costPreference}</Typography>
        </Stack>
        <IconButton aria-label="edit" size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Typography mt={"1rem"} mb={"1rem"} variant="body1">
        {category.userPreferences}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} width="50%">
          <Grid container spacing={1}>
            {category.relatedSubcategories.map((subcategory, index) => (
              <Grid item xs={6} key={index} style={{ display: "contents" }}>
                <Chip
                  label={subcategory}
                  style={{ width: "fit-content", margin: "5px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack direction={"column"} justifyContent={"end"}>
          <Stack direction={"row"} spacing={1}>
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
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
