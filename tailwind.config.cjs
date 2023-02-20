/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Roboto", "Poppins"],
      display: ["Oswald"],
    },
    extend: {
      colors: {
        primary: {
          500: "#dbe021",
          700: "#8ec63d",
        },
        secondary: {
          300: "#f58a65",
          500: "#f15a25",
          700: "#e5460f",
        },
        dark: {
          500: "#484848",
        },
      },
      scale: {
        101: "1.01",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
