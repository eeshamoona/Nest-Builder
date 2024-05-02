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
    title: "Stroll Through Discovery Park",
    place: "Discovery Park",
    address: "3800 Magnolia Blvd W, Seattle, WA 98199",
    personalizedSummary:
      "Expansive park with stunning views, trails, and beaches.",
    reccomendationReasoning: "You enjoy scenic walks and nature.",
    comments: "Beautiful views of the Puget Sound and Olympic Mountains.",
    personalRating: 5,
    category: "Park",
  },
  // Museums
  {
    title: "Journey Through the Museum of Flight",
    place: "Museum of Flight",
    address: "9400 E Marginal Way S, Seattle, WA 98108",
    personalizedSummary:
      "Explore the history of aviation with planes, exhibits, and flight simulators.",
    reccomendationReasoning: "You're fascinated by airplanes and technology.",
    comments:
      "Interactive exhibits and the chance to see historic aircraft up close.",
    personalRating: 5,
    category: "Museum",
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
