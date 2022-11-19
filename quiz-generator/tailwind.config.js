/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js} ", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#ed8936",
        accentlight: "#f6ad55",
        accentdark: "#dd6b20",
      },
    },
  },
  plugins: [],
};
