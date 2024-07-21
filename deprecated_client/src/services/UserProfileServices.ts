import { CategoryModel } from "../models/CategoryModel";

export interface ApiResponse {
  [category: string]: {
    properties: {
      userPreferences: {
        description: string;
      };
      environmentDescriptors: {
        description: string[];
      };
      relatedSubcategories: {
        description: string[];
      };
      confidence: {
        description: string;
      };
    };
  };
}

const SYSTEM_INSTRUCTION = `
Extract the JSON output of this .txt file I'm going to upload, and analyze the google maps search history to create a profile on this user. 

The profile should be about their lifestyle preferences, and broken down into general categories of topics they routinely frequent such as but not limited to:

- Restaurants
- Entertainment
- Travel
- Fitness & Wellness
- Grocery & Dining Preferences
- Shopping
- Personal Care
- Housing
- Utilities
- Finances
- Transportation
- Technology & Communication
- Professional Life
- Personal Development & Learning
- Home & Lifestyle
- Social Activities
- Volunteering
- Religious Activities
- Gaming
- Live Events

The user will use those categories patterns to further explore new options in that category.
`;

const JSON_PROMPT = `
IMPORTANT: Your ONLY output should be an array of category recommendations in a structured JSON array format that matches the following model:
    {
      "<category_name>": {
        "properties": {
          "userPreferences": {
            "description": "A paragraph about what the user usually prefers in this category based on the file input, important for context on the user, do not repeat the subcategories here if they are already in the subcategories field"
          },
          "environmentDescriptors": {
            "description": "A list of 6 adjectives that describe the environment of the category, the user will pick some of these to describe the category"
          },
          "relatedSubcategories": {
            "description": "A list of subcategories that are related to this category (e.g. for a restaurant category, the subcategories could be cuisines like 'Italian', 'Mexican', etc.)"
          },
          "confidence": {
            "description": "A number between 0 (not confident) and 1 (confident) that represents how confident you are in the recommendations for this category"
          }
        }
      }
    }
`;

export const getProfileData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("system_instruction", SYSTEM_INSTRUCTION + JSON_PROMPT);

  return fetch("http://localhost:5000/generate-profile", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return JSON.parse(data) as ApiResponse;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
export function transformApiResponse(data: ApiResponse): CategoryModel[] {
  const categories: CategoryModel[] = [];

  for (const category of Object.keys(data)) {
    const properties = data[category].properties;
    const categoryModel: CategoryModel = {
      title: category,
      userPreferences: properties.userPreferences.description || "",
      environmentDescriptors:
        properties.environmentDescriptors.description || [],
      costPreference: "",
      relatedSubcategories: properties.relatedSubcategories.description || [],
      confidence: parseFloat(properties.confidence.description) || 0,
    };

    categories.push(categoryModel);
  }

  return categories;
}
