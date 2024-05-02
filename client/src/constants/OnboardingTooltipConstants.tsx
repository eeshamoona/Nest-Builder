// Convert the string to Markdown
const initialIntroPromptMarkdown = `
**Your uploaded data will be used to:**
1. Analyze search terms and locations to understand transportation habits, social preferences, and categories of interest.
2. Access relevant information through Google Maps & Places APIs to gain additional insights on user's patterns and routines.
3. Output results to fill out the rest of the onboarding profile.

_This application does not store this file, only the information you will see on the following screens about your profile._
`;

// For the Transportation Screen
const transportationPromptMarkdown = `
Nested generated this list of transportation preferences based on analyzing the search history of the uploaded Google Maps Takeout data.
You may select transportation preferences that apply to you and adjust as needed - these preferences will be used to better tailor Nested’s suggestions.
`;

// For the Preferences Screen
const preferencesPromptMarkdown = `
Nested generated this list of preferences and pre-selected items based on analyzing the search history of the uploaded Google Maps Takeout data. 
For example: if you have searched for **'casual lunch spots'**, Nested may suggest **'Casual'** as a preference. 
You may select preferences that apply to you or add your own - these preferences will be used to better tailor Nested’s suggestions.`;

// For the Review Screen
const reviewPromptMarkdown = `
Nested has generated this summary based on your responses during the onboarding process. Please note that Gemini's accuracy can vary, and you are welcome to edit this field. This summary will be utilized in the final prompt to suggest places.
`;

// For the Categories Screen
const categoriesPromptMarkdown = `
Nested will use the following categories to suggest places that fit your lifestyle. You may edit these categories or add your own - these categories will be used to better tailor Nested’s suggestions.
`;

// For the Explore Page
const explorePromptMarkdown = `
Nested believes these places are a good fit for your lifestyle, read the explanation to see why!
`;

export {
  initialIntroPromptMarkdown,
  transportationPromptMarkdown,
  preferencesPromptMarkdown,
  reviewPromptMarkdown,
  categoriesPromptMarkdown,
  explorePromptMarkdown,
};
