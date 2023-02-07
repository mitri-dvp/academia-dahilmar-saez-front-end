/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Poppins"],
      display: ["Oswald"],
    },
    extend: {
      colors: {
        primary: {
          500: "#dbe021",
          700: "#8ec63d",
        },
        secondary: {
          500: "#f15a25",
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
