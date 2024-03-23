/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "1000px",
        md: "1260px",
        lg: "1400px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};
