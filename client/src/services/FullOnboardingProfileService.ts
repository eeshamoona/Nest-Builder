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
5. Generate and output a JSON structure with transportation preferences of the user based on the analysis. The output should strictly adhere to the specified JSON format without additional commentary.
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
        "selected": "boolean",  // Boolean value indicating if this is the preferred choice (true) or not (false). If this is set to false, 'radius' will not be applicable
        "radius": "number" // Numeric value in miles representing the travel radius, applicable if 'selected' is true
      },
      // Add more transportation options in similar format as needed
    ]
  `;
}

export function createCategoriesInstruction() {
  return `
    "categories": [
      {
        "title": "string", // The name of the category, such as 'restaurant', 'entertainment', or 'shopping'. This title is used to classify the type of destinations or interests for recommendations.
        "userPreferences": "string", // A detailed narrative that captures the user’s specific likes, dislikes, and inclinations within this category, synthesized from historical data and explicit user inputs. This section should provide a rich, nuanced profile that aids in tailoring recommendations more precisely. It may include preferred brands, frequency of visits, typical spending per visit, favored times for visits, and any particular attributes or services that resonate with the user."
        "environmentDescriptors": ["string"], // An array of adjectives that describe the desired ambiance or environment of places in this category, such as 'lively', 'quiet', 'family-friendly', or 'romantic'.
        "relatedSubcategories": ["string"], // A list of subcategories that further define the main category, such as specific types of cuisines under the 'restaurant' category or different forms of entertainment like 'cinema' or 'live music'.
        "costPreference": "string", // A description of the user's budgetary preference for this category, represented as a price range using symbols like '$' for inexpensive through '$$$$' for high end.
        "confidence": "number" // A numeric value between 0 and 1 that indicates the system's confidence level in the accuracy of the recommendations based on the user's past choices and preferences.
      }
      // Additional category objects can be added here in the same format
    ]
  `;
}

export function createSocialPreferencesInstruction() {
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
