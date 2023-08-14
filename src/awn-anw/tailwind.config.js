/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        100: "100px",
        100: "120px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        620: "620px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        400: "400px",
        620: "620px",
      },
      minHeight: {
        80: "80px",
        100: "100px",
        420: "420px",
      },
      maxHeight: {
        240: "240px",
        360: "360px",
        400: "400px",
        510: "510px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: "#2F9B4E",
        textHeadingColor: "#FFF",
        textColor: "#000",
        textHover: "#d9d9d9",
        disabled: "#C5C5C5",
      },
      textSize: {
        40: "40px",
      }
    },
  },
  plugins: [],
}