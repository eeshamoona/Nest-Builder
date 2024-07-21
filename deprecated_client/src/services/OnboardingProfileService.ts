import { CategoryModel } from "../models/CategoryModel";
export interface TransportationType {
  description: string;
  selected: {
    description: string;
  };
  radius: {
    description: string;
  };
}

export interface SocialPreference {
  name: {
    description: string;
  };
  description: {
    description: string;
  };
}

export interface Profile {
  homeAddress: string;
  workAddress: string;
  transportation: {
    [key: string]: TransportationType;
  };
  categories: {
    [key: string]: CategoryModel;
  };
  socialPreferences: {
    [key: string]: SocialPreference;
  };
}

const SYSTEM_INSTRUCTION = `
Act as a data scientist with an expertise in Google APIs, especially Google Maps and Places, to analyze and interpret a user’s search history. The tone should demonstrate a supportive, trustworthy, approachable, understanding, and creative demeanor. It should possess strong analytical capabilities and a deep understanding of user behavior to generate the most accurate results. The task for the AI is to:
`;

const TASK = `
1. Silently extract and read the JSON output of this .txt file uploaded
2. Silently analyze the JSON search data, focusing on keywords and locations to create a profile on this user from the JSON structure provided below
3. Silently access Google Maps & Places APIs to gain deeper context about your searches (e.g., location types, activity details, about description indicators, social preferences).
4. Silently analyze search patterns to enrich the user profile with lifestyle preferences and routine activities and be ready to report back with the results.
5. ONLY OUTPUT the Follow the following JSON structure to create a profile on this user: 
`;

const JSON_STRUCTURE = `
{
  "homeAddress": "full Address",
  "workAddress": "full Address",
  "transportation": {
    "description": "Specify the user's preferred transportation options for reaching places, feel free to write null if not sure",
    "<type1>": {
      "description": "This transportation type (e.g., 'walking', 'biking', 'driving', 'train',...).",
      "selected": {
        "description": "Boolean value indicating if this is the preferred choice (true) or not (false). If this is set to false, 'radius' will not be applicable."
      },
      "radius": {
        "description": "Numeric value (in miles) representing the comfortable travel radius when using this type. This is not applicable if 'selected' is false."
      }
    },
    // ... more transportation options
  },
  "categories": {
    "description": "This object stores information about different categories of places the user might be interested in.",
    "<category_name1>": {
      "description": "This key represents a specific category of places (e.g., 'restaurant', 'entertainment', 'shopping', ....).",
      "properties": {
        "userPreferences": {
          "description": "A brief description about what the user usually prefers in this category based on the file input, patterns and preferrences"
        },
        "environmentDescriptors": {
          "description": "Up to 6 adjectives describing the environment the user prefers for this category in Title Case"
        },
        "relatedSubcategories": {
          "description": "A list of subcategories related to this main category (e.g., cuisines for restaurants, types of shops for shopping, ...)."
        },
        "costPreference": {
          "description": "Text string representing the user's preferred cost range for this category (e.g., '$', '$$', $$$, $$$$)."
        },
        "confidence": {
          "description": "Numeric value between 0 (not confident) and 1 (confident) representing confidence in recommendations for this category."
        }
      }
    },
    // ... other categories
  },
  "socialPreferences": {
    "description": "This list represents the user's social preferences for various general descriptors found in Google Maps 'About' sections.",
    "[]": {
      "description": "Each element represents a single social preference.",
      "name": {
        "description": "Text string specifying the name of the preference (e.g., 'Accessible', 'Safety',Affordable', 'Family-friendly', 'Historic', 'Pet-Friendly', 'Quiet', ...)."
      },
      "description": {
        "description": "Text string describing what the user finds important about this social preference (e.g., 'Ramps available for easy access')."
      }
    }
  }
}
`;

export const getProfileData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const system_instruction = SYSTEM_INSTRUCTION + TASK + JSON_STRUCTURE;
  formData.append("system_instruction", system_instruction);

  return fetch("http://localhost:5000/generate-profile", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Received response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received JSON data:", data);
      const parsedData = JSON.parse(data) as Profile;
      console.log("Parsed data:", parsedData);
      return parsedData;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
