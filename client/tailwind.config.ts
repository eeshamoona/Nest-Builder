import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/chakra/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [],
};
export default config;
