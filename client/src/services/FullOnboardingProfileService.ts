import { CategoryModel } from "../models/CategoryModel";

export interface TransporationResponseType {
  description: string;
  selected: {
    description: string;
  };
  radius: {
    description: string;
  };
}

export interface SocialPreferenceResponseType {
  name: {
    description: string;
  };
  description: {
    description: string;
  };
}

export interface TransportationType {
  selected: boolean;
  radius: string;
}

interface TransportationDetails {
  selected: boolean;
  radius: number | null;
}

export interface Profile {
  homeAddress: string;
  workAddress: string;
  transportation: {
    [key: string]: {
      selected: boolean;
      radius: number;
    };
  };
  categories: {
    [key: string]: CategoryModel;
  };
  socialPreferences: {
    [key: string]: SocialPreferenceResponseType;
  };
}

const baseInstruction = `
Act as a data scientist with an expertise in Google APIs, especially Google Maps and Places, to analyze and interpret a user’s search history. The tone should demonstrate a supportive, trustworthy, approachable, understanding, and creative demeanor. It should possess strong analytical capabilities and a deep understanding of user behavior to generate the most accurate results.
`;

const task = `
1. Silently extract and read the JSON output of this .txt file uploaded.
2. Silently analyze the JSON search data, focusing on keywords and locations.
3. Silently access Google Maps & Places APIs to gain deeper context.
4. Silently analyze search patterns to enrich the user profile with lifestyle preferences and routine activities.
5. ONLY OUTPUT the following JSON structure to create a profile on this user:
`;

function createAddressInstruction() {
  return `
    "homeAddress": "full Address",
    "workAddress": "full Address"
  `;
}

function createTransportationInstruction() {
  return `
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
  `;
}

function createCategoriesInstruction() {
  return `
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
  `;
}

function createSocialPreferencesInstruction() {
  return `
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
  `;
}

function extractJsonFromOutput(output: any) {
  console.log("FDSLFJDSLKFJ", output);
  try {
    // Assuming the JSON starts with a '{' and ends with '}', and is the last part of the output
    const jsonStartIndex = output.lastIndexOf("{");
    const jsonEndIndex = output.lastIndexOf("}") + 1;
    console.log(
      `jsonStartIndex: ${jsonStartIndex}, jsonEndIndex: ${jsonEndIndex}`
    ); // Log the start and end indices
    const jsonString = output.substring(jsonStartIndex, jsonEndIndex);
    console.log(`jsonString: ${jsonString}`); // Log the extracted JSON string
    const parsedJson = JSON.parse(jsonString);
    console.log(`parsedJson: ${parsedJson}`); // Log the parsed JSON object
    return parsedJson;
  } catch (error) {
    console.error("Failed to extract JSON:", error);
    return null; // or handle error differently
  }
}

function sendProfileRequest(instructionPart: string, file: File) {
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

export const getProfileData = async (file: File): Promise<Profile> => {
  const [addressInfo, transportationInfo] = await Promise.all([
    sendProfileRequest(createAddressInstruction(), file),
    sendProfileRequest(createTransportationInstruction(), file),
  ]);

  // const transportationInfo = {
  //   transportation: {
  //     walking: {
  //       description: "Walking",
  //       selected: {
  //         description: "true",
  //       },
  //       radius: {
  //         description: "1",
  //       },
  //     },
  //     biking: {
  //       description: "Biking",
  //       selected: {
  //         description: "false",
  //       },
  //       radius: {
  //         description: "0",
  //       },
  //     },
  //     driving: {
  //       description: "Driving",
  //       selected: {
  //         description: "false",
  //       },
  //       radius: {
  //         description: "0",
  //       },
  //     },
  //   },
  // };

  const categoriesInfo = {
    categories: {
      restaurant: {
        title: "Restaurant",
        userPreferences: "User usually prefers fast food restaurants",
        environmentDescriptors: [
          "Casual",
          "Friendly",
          "Comfortable",
          "Cozy",
          "Welcoming",
          "Inviting",
        ],
        relatedSubcategories: [
          "Fast Food",
          "American",
          "Burgers",
          "Sandwiches",
          "Salads",
          "Wraps",
        ],
        confidence: 0.8,
      },
      entertainment: {
        title: "Entertainment",
        userPreferences: "User usually prefers movie theaters",
        environmentDescriptors: [
          "Exciting",
          "Fun",
          "Entertaining",
          "Enjoyable",
          "Thrilling",
          "Engaging",
        ],
        relatedSubcategories: [
          "Movies",
          "Popcorn",
          "Snacks",
          "Drinks",
          "Candy",
          "3D",
          "IMAX",
        ],
        confidence: 0.7,
      },
    },
  };
  const socialPreferencesInfo = {
    socialPreferences: {
      accessible: {
        name: { description: "Accessible" },
        description: { description: "Ramps available for easy access" },
      },
      safety: {
        name: { description: "Safety" },
        description: { description: "Security cameras and guards on site" },
      },
    },
  };

  let transportation_info: {
    [key: string]: { selected: boolean; radius: number };
  } = {};

  for (let [transport_type, details] of Object.entries(
    transportationInfo["transportation"]
  )) {
    let typedDetails = details as TransportationDetails;
    transportation_info[transport_type] = {
      selected: typedDetails.selected,
      radius: typedDetails.radius || 0, // Use 0 if radius is undefined
    };
  }

  return {
    homeAddress: addressInfo.homeAddress,
    workAddress: addressInfo.workAddress,
    transportation: transportation_info,
    categories: categoriesInfo.categories,
    socialPreferences: socialPreferencesInfo.socialPreferences,
  };
};
