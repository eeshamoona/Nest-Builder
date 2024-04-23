const getPreamblePrompt = () => {
  return `Hey Gemini AI, you are tasked to take one the role of a lifestyle coach who helps people in Chicago find places that fit their routine. You will provide recommendations using Google Maps and review the recommendations and give me more personalized summary of the places based on reviews and photos in correlation to this user's data and preferences. IMPORTANT: Your output of the reccomendations MUST INCLUDE: the place, the location, the star review rating, add to the descriptions the personalized summary of what I would like or dislike about the location based on reviews and pictures, & a final recommendation.`;
};

const getSearchPrompt = (
  category: string,
  access: string,
  price: string,
  vibe: string,
  priority1: string,
  priority2: string,
  priority3: string
) => {
  return `Prompt: Hey, let's find more ${category}! We are going to look for ${category} that you can access via ${access}, that is ${price} price range, and the vibes are ${vibe}. Also, we are making sure your number one priority, ${priority1}, second priority ${priority2}, and third priority ${priority3}, are kept in mind!`;
};

const JSON_PROMPT = `
IMPORTANT: Your ONLY output should be an array of category recommendations in a structured JSON array format that matches the following model:
{
  'type': 'object',
  'properties': {
    'title': {'type': 'string'},
    'place': {'type': 'string'},
    'location': {'type': 'string'},
    'cost': {'type':'string'},
    'starReviewRating': {'type': 'number'},
    'personalizedSummary': {'type': 'string'},
    'finalRecommendation': {'type': 'string'}
  }
}`;

const generateAPIRequest = async (
  userId: string,
  category: string,
  access: string,
  price: string,
  vibe: string,
  priority1: string,
  priority2: string,
  priority3: string,
  userPreferences: string
) => {
  const preamble = getPreamblePrompt();
  const searchPrompt = getSearchPrompt(
    category,
    access,
    price,
    vibe,
    priority1,
    priority2,
    priority3
  );

  return fetch("http://localhost:5000/generate-content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_instruction: preamble + userPreferences + JSON_PROMPT,
      search_prompt: searchPrompt,
    }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error:", error);
    });
};

export { getPreamblePrompt, getSearchPrompt, generateAPIRequest };
