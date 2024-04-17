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

export const getProfileData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("system_instruction", SYSTEM_INSTRUCTION);

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
      relatedSubcategories: properties.relatedSubcategories.description || [],
      confidence: parseFloat(properties.confidence.description) || 0,
    };

    categories.push(categoryModel);
  }

  return categories;
}
