import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "product-sans-bold-italic": [
          "Product Sans Bold Italic",
          ...defaultTheme.fontFamily.sans,
        ],
        "product-sans-bold": [
          "Product Sans Bold",
          ...defaultTheme.fontFamily.sans,
        ],
        "product-sans-italic": [
          "Product Sans Italic",
          ...defaultTheme.fontFamily.sans,
        ],
        "product-sans-regular": [
          "Product Sans Regular",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};

export default config;
