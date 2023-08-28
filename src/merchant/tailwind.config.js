/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        200: "200px",
        225: "225px",
        250: "250px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        650: "650px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        200: "200px",
        225: "225px",
        250: "250px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
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
        red: "#D46058",
<<<<<<< HEAD
        gray: "#F5F5F5",
=======
        card: "#F5F5F5",
        yellow: "#ECC04D",
        inactive: "#F5F5F5",
        gray: "#D9D9D9",
>>>>>>> 24c57bbe4b6a4d8ad536f5e5df0264aca50c3d6c
      },
      textSize: {
        40: "40px",
      }
    },
  },
  plugins: [],
}