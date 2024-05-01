import { CategoryModel } from "../models/CategoryModel";
import { ExploreCardModel } from "../models/ExploreCardModel";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
import { TransportationModel } from "../models/TransporationModel";
import User from "../models/UserModel";
import { getAge } from "../utils/RandomUtils";

export const getTransportationString = (
  transportationData: TransportationModel[]
) => {
  if (transportationData.length === 0) {
    return "No transportation preferences selected.";
  }
  // Filter selected transportations and sort them by radius
  const selectedAndSortedTransportations = transportationData
    .filter((transportation) => transportation.selected)
    .sort((a, b) => a.radius - b.radius);

  // Map transportations to strings
  const transportationStrings = selectedAndSortedTransportations.map(
    (transportation) =>
      `${transportation.method} (${transportation.radius} miles)`
  );

  // Format the final string
  let finalString;
  if (transportationStrings.length > 1) {
    const lastTransportation = transportationStrings.pop();
    finalString = `${transportationStrings.join(
      ", "
    )}, and ${lastTransportation}`;
  } else {
    finalString = transportationStrings[0];
  }

  return finalString;
};

export const getUserProfileData = (
  user: User,
  addressParts: string[],
  transportationPreferences: TransportationModel[],
  lifestylePreferences: string,
  additionalInfo: string,
  socialPreferences: SocialPreferenceModel[]
) => {
  const age = user && user.birthday ? getAge(user.birthday) : "";
  const gender = user?.gender || "";
  const city = addressParts ? addressParts[1] : "";
  const address = addressParts ? addressParts[0] : "";
  const transportation = getTransportationString(
    transportationPreferences || []
  );
  const routines = lifestylePreferences || "";
  const additional = additionalInfo || "";
  const priorities = socialPreferences
    .filter((preference) => preference.selected)
    .map((preference) => preference.name)
    .join(", ");

  return `I am a ${age} year old ${gender}, and I am moving to ${city}. My address is ${address}, and I prefer to travel by ${transportation}. I have the following routines and preferences in my locations: ${routines}. Additional information: ${additional}. When deciding on the places I go frequently, I care about the following priorities: ${priorities}.`;
};

export const getCategoryPrompt = (
  category: CategoryModel,
  categoryTitle?: string
) => {
  if (!categoryTitle) {
    categoryTitle = category.title;
  }

  const costPreference = category.costPreference
    ? `in the ${category.costPreference} price range`
    : "";
  const environmentDescriptors =
    category.environmentDescriptors.length > 0
      ? `with a vibe of ${category.environmentDescriptors.join(", ")}`
      : "";
  const userPreferences = category.userPreferences
    ? `keeping in mind your preference for ${category.userPreferences}`
    : "";

  return `We will specifically look for ${categoryTitle} ${costPreference} ${environmentDescriptors}. ${userPreferences}`;
};

export function exploreInstruction() {
  return `
  Generate and output an array of at least three JSON objects that follow this JSON structure with results of your search based on analysis using Google Maps and Google Places API. The output should strictly adhere to this JSON format without additional commentary:  
    {
      "title": "string", // A concise title summarizing the recommendation.
      "place": "string", // The name of the recommended location.
      "address": "string", // The full address of the recommended location. Be precise
      "personalizedSummary": "string", // A brief description of the recommendation tailored to the user's specific preferences.
      "reccomendationReasoning": "string", // User friendly explaination of the rationale behind the recommendation, highlighting factors like user preferences and data analysis.
      "confidence": "number", // A numerical value (0-1) indicating the confidence level in this recommendation.
      "category": "string" // Categorizes the recommendation, such as "Restaurant", "Park", "Event", etc. This can be found in the prompt.
    }
  `;
}

export const generateAPIRequest = async (
  user: User,
  addressParts: string[],
  transportationPreferences: TransportationModel[],
  lifestylePreferences: string,
  additionalInfo: string,
  socialPreferences: SocialPreferenceModel[],
  category: CategoryModel,
  categoryTitle: string
): Promise<ExploreCardModel[]> => {
  const userProfileString = getUserProfileData(
    user,
    addressParts,
    transportationPreferences,
    lifestylePreferences,
    additionalInfo,
    socialPreferences
  );

  const categoryPrompt = getCategoryPrompt(category, categoryTitle);

  return fetch("http://localhost:5000/generate-content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_instruction: userProfileString + exploreInstruction(),
      search_prompt: categoryPrompt,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data);
      return data.map((result: any) => {
        return {
          title: result.title,
          place: result.place,
          address: result.address,
          personalizedSummary: result.personalizedSummary,
          reccomendationReasoning: result.reccomendationReasoning,
          confidence: result.confidence,
          category: category.title,
        } as ExploreCardModel;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
