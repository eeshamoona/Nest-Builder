const getPreamblePrompt = (city: string) => {
  return `Hey Gemini AI, you are tasked to take on the role of a lifestyle coach who helps people in ${city} find places that fit their routine. You will provide recommendations using Google Maps and review the recommendations to provide a personalized summary based on reviews and photos in correlation with the user's data and preferences. IMPORTANT: Your ouput of the recommendations MUST include: the PLACE, the ADDRESS, a DESCRIPTION, a SUMMARY and a COST indication as well as an score from 0.0 to 1.0 of your CONFIDENCE in your answer.`;
}

const getNestPrompt = (
  category:         string,
  modeOfTransport:  string,
  lowerPriceBound:  number,
  upperPriceBound:  number,
  vibe:             string,
) => {
  return `Prompt: Gemini, help find more ${category}. Look for ${category} that you can access via ${modeOfTransport}, that costs between ${lowerPriceBound} and ${upperPriceBound} with a vibe similar to ${vibe}`;
}

const JSON_PROMPT = `IMPORTANT: Your ONLY output should be an array of recommendations in a structured JSON array that matches the following model:
  {
    'type': 'object',
    'properties': {
      'title':                {'type': 'string'},
      'place':                {'type': 'string'},
      'location':             {'type': 'string'},
      'cost':                 {'type': 'string'},
      'personalizedSummary':  {'type': 'string'},
      'confidence:            {'type': 'number'},
    },
  }`;

const generateNestAPIRequest = async (
  city:             string,
  category:         string,
  modeOfTransport:  string,
  lowerPriceBound:  number,
  upperPriceBound:  number,
  vibe:             string,
) => {
  const preamble = getPreamblePrompt(city);
  const nestPropmt = getNestPrompt(
    category,
    modeOfTransport,
    lowerPriceBound,
    upperPriceBound,
    vibe
  );

  return fetch("http://localhost:5000/generate-content", {
    method: "POST",
    headers: {
     "Content-Type": "application/json", 
    },
    body: JSON.stringify({
      system_instruction: preamble + JSON_PROMPT,
      search_prompt: nestPropmt,
    }),

  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error", error);
    });
};

export { getPreamblePrompt, getNestPrompt, generateNestAPIRequest }
