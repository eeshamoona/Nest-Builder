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

export const getProfileData = (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("system_instruction", SYSTEM_INSTRUCTION);

  console.log("Getting Profile Data...");

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
      //TODO: Write to the user's database -> categories with preferences, subcategories, and confidence level
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
