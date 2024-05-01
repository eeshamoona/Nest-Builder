import React, { useState } from "react";
import { CategoryModel } from "../models/CategoryModel";
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { set, update, get, ref } from "firebase/database";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase.config";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "1rem",
    backgroundColor: "#F3F5EA",
  },
};

interface CategoryCardProps {
  categoryProp: CategoryModel;
  deleteCategoryCallback?: (category: CategoryModel) => void;
  editModeProp?: boolean;
}

const CategoryCard = ({
  categoryProp,
  deleteCategoryCallback,
  editModeProp,
}: CategoryCardProps) => {
  const auth = UserAuth();
  const [editMode, setEditMode] = useState(editModeProp || false);
  const [category, setCategory] = useState(categoryProp);

  const [showPreferences, setShowPreferences] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (field: string, value: string | string[]) => {
    setCategory({ ...category, [field]: value });
  };

  const saveChanges = () => {
    if (auth?.user && category.title.trim() !== "") {
      const categoryRef = ref(
        database,
        `users/${auth.user?.id}/categories/${category.title}`
      );
      get(categoryRef).then((snapshot) => {
        if (snapshot.exists()) {
          update(categoryRef, category);
        } else {
          set(categoryRef, category);
        }
      });
    }
    setEditMode(false);
  };

  const handleDelete = () => {
    if (deleteCategoryCallback) deleteCategoryCallback(category);
  };

  return (
    <Paper style={styles.card}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2}>
          {editMode ? (
            <>
              <TextField
                variant="outlined"
                label="Title"
                placeholder="Category Title"
                value={category.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Cost Preference"
                placeholder="$, $$, $$$, $$$$"
                value={category.costPreference}
                onChange={(e) => handleChange("costPreference", e.target.value)}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">{category.title}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5">{category.costPreference}</Typography>
            </>
          )}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {editMode ? (
            <Stack direction={"row"}>
              <IconButton
                onClick={saveChanges}
                color="success"
                sx={{
                  height: "2.5rem",
                  aspectRatio: 1,
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                color="error"
                sx={{
                  height: "2.5rem",
                  aspectRatio: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : (
            <IconButton onClick={handleEditToggle} color="success">
              <EditIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
      {editMode ? (
        <TextField
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          label="User Preferences"
          placeholder="Enter your preferences here"
          value={category.userPreferences}
          onChange={(e) => handleChange("userPreferences", e.target.value)}
          margin="normal"
        />
      ) : (
        <Stack direction={"row"}>
          <Typography mt={"1rem"} mb={"1rem"} variant="body1">
            {showPreferences
              ? category.userPreferences
              : `${category.userPreferences.substring(0, 250)}`}
            <Button
              size="small"
              color="success"
              variant="text"
              onClick={() => setShowPreferences(!showPreferences)}
            >
              {showPreferences ? "Show less" : "... Show more"}
            </Button>
          </Typography>
        </Stack>
      )}
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"}>
          {editMode ? (
            <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              freeSolo
              fullWidth
              value={category.relatedSubcategories}
              onChange={(event, newValue) => {
                handleChange("relatedSubcategories", newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    marginTop: "0.25rem",
                  }}
                  variant="outlined"
                  label="Add Subcategories"
                  placeholder="Type and press enter"
                />
              )}
            />
          ) : (
            <Stack direction="column">
              <Typography variant="subtitle2" mb="0.5rem">
                Related Subcategories:
              </Typography>
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
          )}
        </Stack>
        <Stack direction={"row"}>
          {editMode ? (
            <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              freeSolo
              fullWidth
              value={category.environmentDescriptors}
              onChange={(event, newValue) => {
                handleChange("environmentDescriptors", newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    color="success"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Add Vibes"
                  placeholder="Type and press enter"
                />
              )}
            />
          ) : (
            <Stack direction="column">
              <Typography variant="subtitle2" mb="0.5rem">
                Vibes:
              </Typography>
              <Grid container spacing={1}>
                {category.environmentDescriptors.map((subcategory, index) => (
                  <Grid item xs={6} key={index} style={{ display: "contents" }}>
                    <Chip
                      label={subcategory}
                      color="success"
                      style={{ width: "fit-content", margin: "5px" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
