/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js} ", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#1D1D1D",
        secondary: "#414141",
        accent: "#CCFDD2",
        text: "#FFFFFF",
        textSecondary: "#CCFDD2",
      },
      backgroundImage: {
        "login-bg": "url('/public/images/login-bg.svg')",
      },
    },
  },
  plugins: [],
};
