/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { min: "100px", max: "500px" },
        tablet: { min: "501px", max: "991px" },
        laptop: { min: "992px", max: "1400px " },
        pc: { min: "1501px" },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      fontSize: {
        17: "17px",
      },
      margin: {
        110: "-110px",
      },
    },
  },
  plugins: [],
};
