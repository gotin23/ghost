/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      // black: "#192324",
      black: "#080523",
      blackTransparent: "rgb(8 5 35 / 55%)",
      // black: "#041404",
      // primary: "#C2F970",
      primary: "#70FFF1",
      grey: "#b0aeae",
      white: "#ffff",
      // whiteHover: "#ffff",
      primaryHover: "#EBFFFD",
      // // primaryHover: "#c1d5a5",
    },
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "652px" },
    },
  },
  plugins: [],
};
