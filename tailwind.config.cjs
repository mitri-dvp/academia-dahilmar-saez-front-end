/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./pages/**/*.{ts,tsx}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
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
      keyframes: {
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-0.25rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("flowbite/plugin"),
    require("tailwindcss-animated"),
  ],
};
