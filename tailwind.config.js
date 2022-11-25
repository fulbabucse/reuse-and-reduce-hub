/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0FCFEC",
        secondaryColor: "#19D3AE",
        baseColor: "#2d3748",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
