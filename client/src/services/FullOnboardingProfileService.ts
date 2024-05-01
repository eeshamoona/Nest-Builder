import { CategoryModel } from "../models/CategoryModel";
import { TransportationModel } from "../models/TransporationModel";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
export interface Profile {
  homeAddress: string;
  workAddress: string;
  transportation: TransportationModel[];
  categories: CategoryModel[];
  socialPreferences: SocialPreferenceModel[];
}

const baseInstruction = `
Act as a data scientist with expertise in Google APIs, particularly Google Maps and Places. Your primary role is to analyze and interpret user search data to create a profile focusing on transportation habits. Adopt a supportive, trustworthy, and approachable demeanor, using your strong analytical capabilities and understanding of user behavior to deliver precise results.
`;

const task = `
1. Extract and read the JSON data from the uploaded .txt file silently.
2. Analyze the JSON data to identify key search terms and locations silently.
3. Access Google Maps & Places APIs for additional insights into the search data silently.
4. Analyze patterns in the search data to deduce lifestyle preferences and routine activities of the user silently.
5. Generate and output a JSON structure with preferences of the user based on the analysis. The output should strictly adhere to the specified JSON format without additional commentary.
`;

export function createAddressInstruction() {
  return `
    "homeAddress": "full Address",
    "workAddress": "full Address"
  `;
}

export function createTransportationInstruction() {
  return `
    "transportation": [
      {
        "method": "string", // The method of transportation (e.g., "walking", "biking", "driving", "train", "bus",...)
        "selected": "boolean",  // Boolean value indicating if this is the preferred choice (true) or not (false). If this is set to false, radius will be null
        "radius": "number" // Numeric value (in miles) representing the comfortable travel radius when using this type. This is null if selected is false."
      },
      // Add more transportation options in similar format as needed
    ]
  `;
}

export function createCategoriesInstruction() {
  return `
    "categories": [
      {
        "title": "string", // The category name, such as 'restaurant', 'entertainment', or 'shopping', etc.
        "userPreferences": "string", // A narrative in the first-person that describes the user's preferences in this category, based on historical data and user inputs. Includes preferences like brands, visit frequency, spending habits, and favored times.
        "environmentDescriptors": ["string"], // Up to 6 adjectives describing the environment the user prefers for this category in Title Case
        "relatedSubcategories": ["string"], // Related subcategories within the main category, e.g., types of cuisines or forms of entertainment.
        "costPreference": "string", // Text string representing the user's preferred cost range for this category represented by one of these options '$', '$$', $$$, $$$$)
        "confidence": "number" // The system's confidence level in its recommendations, on a scale from 0 to 1.
      }
      // More categories can be added in this format
    ]
  `;
}

export function createSocialPreferencesInstruction() {
  return `
    {
      "socialPreferences": [
        {
          "name": "string", // Descriptors focusing on lifestyle preferences important to the user, such as 'Accessible', 'Safe', 'Affordable', 'Quiet'. These are not categories or types of location or transportation, but rather adjectives describing the place or experiences the user prefers
          "selected": "boolean", // Indicates whether this preference is a priority for the user.
          "description": "string" // Details the importance and relevance of this preference in the user's life.
        }
        // Additional preferences can be added as needed.
      ],
      "otherPreferences": ["string"], // Extends the list to include 20 more lifestyle preferences, such as 'Family Friendly', 'Convenient', 'Safety', 'Cleanliness', 'Accessibility', 'Affordability', 'Quietness', 'Community', 'Amenities', 'Green Spaces', 'Quiet'.
      "lifestyleParagraph": "string" // A narrative in the first-person that describes the user's daily activities, community involvement, social interactions, and overall lifestyle preferences. This should offer a comprehensive, personal view without repeating the specifics of social preferences.
    }
  `;
}

export function sendProfileRequest(instructionPart: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const systemInstruction = baseInstruction + task + instructionPart;
  formData.append("system_instruction", systemInstruction);

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
      // data is already a json
      console.log("Received JSON data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
