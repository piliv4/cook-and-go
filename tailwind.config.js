/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#006d77",
        secondaryGreen: "#83c5be",
        terciaryIntermediate: "#edf6f9",
        secondaryOrange: "#ffddd2",
        primaryOrange: "#e29578",
        background: "#f8f6f5",
      },
    },
  },
  plugins: [],
};
