/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js} ", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E1E",
        secondary: "#414141",
        accent: "#CCFDD2",
        text: "#FFFFFF",
        textSecondary: "#CCFDD2",
      },
    },
  },
  plugins: [],
};
