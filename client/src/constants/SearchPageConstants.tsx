const PRICE_OPTIONS = [
  "Free ($)",
  "Very Inexpensive ($-$$)",
  "Inexpensive ($$)",
  "Moderate ($$-$$$)",
  "Above Average ($$$)",
  "Expensive ($$$-$$$$)",
  "Luxurious ($$$$$)",
];

const ACCESS_OPTIONS = [
  "Walking",
  "Biking",
  "Driving",
  "Taking Public Transit",
];

const ADDITIONAL_VIBE_OPTIONS = [
  "Feminine",
  "Masculine",
  "Fun",
  "Independent",
  "Supportive",
  "Energetic",
  "Relaxed",
  "Luxurious",
  "Minimalist",
  "Loud",
  "Quiet",
];

// TODO: Make these priorities based on the user's profile
const DEFAULT_PRIORITIES = [
  "Safety",
  "Cleanliness",
  "Accessibility",
  "Convenience",
  "Affordability",
  "Quietness",
  "Community",
  "Amenities",
  "Green spaces",
  "Quiet",
];

const DEFAULT_CATEGORIES = [
  "Restaurants",
  "Bars",
  "Coffee Shops",
  "Grocery Stores",
  "Parks",
  "Gyms",
];

const DEFAULT_SAVED_LOCATIONS = [
  // Parks
  {
    title: "Walk in the Park",
    place: "Millennium Park",
    address: "Chicago, IL 60602",
    personalizedSummary:
      "Beautiful park with art installations, gardens, and events.",
    reccomendationReasoning: "You like to be around nature and art.",
    comments: "Great place to relax and enjoy the city.",
    personalRating: 4,
    category: "Park",
  },
  {
    title: "Visit the Zoo",
    place: "Lincoln Park Zoo",
    address: "2430 N Cannon Dr, Chicago, IL 60614",
    personalizedSummary:
      "Something for everyone, with animals, nature, and lake views.",
    reccomendationReasoning: "You enjoy a variety of activities.",
    comments:
      "Great for a day trip with the zoo, conservatory, and lakefront access.",
    personalRating: 5,
    category: "Park",
  },

  // Grocery Stores
  {
    title: "Shop for Groceries",
    place: "Trader Joe's",
    address: "44 E Ontario St, Chicago, IL 60611",
    personalizedSummary: "Great deals on groceries and unique finds.",
    reccomendationReasoning: "You like to find unique products.",
    comments: "Love their unique products and affordable prices.",
    personalRating: 5,
    category: "Grocery",
  },
];

const DEFAULT_USER_PREFERENCES = "";

export {
  PRICE_OPTIONS,
  ACCESS_OPTIONS,
  ADDITIONAL_VIBE_OPTIONS,
  DEFAULT_PRIORITIES,
  DEFAULT_CATEGORIES,
  DEFAULT_USER_PREFERENCES,
  DEFAULT_SAVED_LOCATIONS,
};
