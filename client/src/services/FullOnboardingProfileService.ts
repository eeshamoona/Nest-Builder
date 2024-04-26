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
  [
    {
      "method": "string", // The method of transportation (e.g., "walking", "biking", "driving", "train"...)
      "selected": "boolean", // Boolean value indicating if this is the preferred choice (true) or not (false). If this is set to false, 'radius' will not be applicable
      "radius": "number" // Numeric value in miles representing the travel radius, applicable if 'selected' is true
    },
    // Add more transportation options in similar format as needed
  ]
  `;
}

function createCategoriesInstruction() {
  return `
  "categories": [
    {
      "title": "string", // The name of the category, such as 'restaurant', 'entertainment', or 'shopping'. This title is used to classify the type of destinations or interests for recommendations.
      "userPreferences": "string", // A detailed description of the user's preferences within this category, based on analysis of past behavior and expressed interests. This might include preferred cuisine types in restaurants or favorite genres in entertainment.
      "environmentDescriptors": ["string"], // An array of adjectives that describe the desired ambiance or environment of places in this category, such as 'lively', 'quiet', 'family-friendly', or 'romantic'.
      "relatedSubcategories": ["string"], // A list of subcategories that further define the main category, such as specific types of cuisines under the 'restaurant' category or different forms of entertainment like 'cinema' or 'live music'.
      "costPreference": "string", // A description of the user's budgetary preference for this category, represented as a price range using symbols like '$' for inexpensive through '$$$$' for high end.
      "confidence": "number" // A numeric value between 0 and 1 that indicates the system's confidence level in the accuracy of the recommendations based on the user's past choices and preferences.
    }
    // Additional category objects can be added here in the same format
  ]
  `;
}

function createSocialPreferencesInstruction() {
  return `
  "socialPreferences": [
    {
      "name": "string", // The name of the preference (e.g., 'Accessible', 'Safety', ...)
      "selected": "boolean", // Indicates if this preference is important to the user (true) or not (false)
      "description": "string" // Description of the preference and its significance to the user
    }
    // More social preferences can be added here in the same format
  ]
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
  // const [
  //   addressInfo,
  //   transportationInfo,
  //   categoriesInfo,
  //   socialPreferencesInfo,
  // ] = await Promise.all([
  //   sendProfileRequest(createAddressInstruction(), file),
  //   sendProfileRequest(createTransportationInstruction(), file),
  //   sendProfileRequest(createCategoriesInstruction(), file),
  //   sendProfileRequest(createSocialPreferencesInstruction(), file),
  // ]);

  const combinedInstructionsA =
    createAddressInstruction() + createTransportationInstruction();
  // createCategoriesInstruction() +
  // createSocialPreferencesInstruction();

  const combinedInstructionsB =
    createCategoriesInstruction() + createSocialPreferencesInstruction();

  const profileA = await sendProfileRequest(combinedInstructionsA, file);
  const profileB = await sendProfileRequest(combinedInstructionsB, file);
  const profileData = { ...profileA, ...profileB };
  // const transportationInfo = {
  //   transportation: {
  //     walking: {
  //       selected: true,
  //       radius: 1,
  //     },
  //     biking: {
  //       selected: false,
  //       radius: null,
  //     },
  //     driving: {
  //       selected: true,
  //       radius: 10,
  //     },
  //     train: {
  //       selected: false,
  //       radius: null,
  //     },
  //   },
  // };

  // const categoriesInfo = {
  //   categories: {
  //     restaurant: {
  //       title: "Restaurant",
  //       userPreferences: "User usually prefers fast food restaurants",
  //       environmentDescriptors: [
  //         "Casual",
  //         "Friendly",
  //         "Comfortable",
  //         "Cozy",
  //         "Welcoming",
  //         "Inviting",
  //       ],
  //       relatedSubcategories: [
  //         "Fast Food",
  //         "American",
  //         "Burgers",
  //         "Sandwiches",
  //         "Salads",
  //         "Wraps",
  //       ],
  //       confidence: 0.8,
  //     },
  //     entertainment: {
  //       title: "Entertainment",
  //       userPreferences: "User usually prefers movie theaters",
  //       environmentDescriptors: [
  //         "Exciting",
  //         "Fun",
  //         "Entertaining",
  //         "Enjoyable",
  //         "Thrilling",
  //         "Engaging",
  //       ],
  //       relatedSubcategories: [
  //         "Movies",
  //         "Popcorn",
  //         "Snacks",
  //         "Drinks",
  //         "Candy",
  //         "3D",
  //         "IMAX",
  //       ],
  //       confidence: 0.7,
  //     },
  //   },
  // };
  // const socialPreferencesInfo = {
  //   socialPreferences: {
  //     accessible: {
  //       name: { description: "Accessible" },
  //       description: { description: "Ramps available for easy access" },
  //     },
  //     safety: {
  //       name: { description: "Safety" },
  //       description: { description: "Security cameras and guards on site" },
  //     },
  //   },
  // };

  // return {
  //   homeAddress: addressInfo.homeAddress,
  //   workAddress: addressInfo.workAddress,
  //   transportation: transportationInfo.transportation,
  //   categories: categoriesInfo.categories,
  //   socialPreferences: socialPreferencesInfo.socialPreferences,
  // };
  return profileData;
};
