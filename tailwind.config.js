/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(0, 0, 0, 0.3)",
          border: "rgba(255, 255, 255, 0.4)",
        },
        primary: {
          DEFAULT: "#6d28d9", // Deep purple
          light: "#8b5cf6",
          dark: "#5b21b6",
        },
        accent: {
          DEFAULT: "#06b6d4", // Cyan
        },
      },
    },
  },
  plugins: [],
};
