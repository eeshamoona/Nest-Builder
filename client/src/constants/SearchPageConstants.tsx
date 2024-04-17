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

const DEFAULT_USER_PREFERENCES = `I'm a 23 year old new grad software engineer living in River North, Chicago. Zip code = 60654. I have a daily gym routine and usually go there in the mornings. I love Italian cuisine for lunch and frequent dog parks, probably suggesting I have a pet or want one`;

export {
  PRICE_OPTIONS,
  ACCESS_OPTIONS,
  ADDITIONAL_VIBE_OPTIONS,
  DEFAULT_PRIORITIES,
  DEFAULT_USER_PREFERENCES,
};
