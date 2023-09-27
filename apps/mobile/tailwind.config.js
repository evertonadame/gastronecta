/** @type {import('tailwindcss').Config} */1
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#9B9B9B",
          200: "#2F4B4E",
          300: "#2F2D2C",
          400: "#131313",
          500: "#313131",
          600: "#989898"
        },
        secondary: {
          100: "#FFFFFF",
          200: "#F3F3F3"
        },
        tertiary: {
          100: "#fff7f2",
          200: "#C67C4E",
          300: "#C67C4E",
        },
        quaternary: {
          100: "#ED5151"
        }
      },
      fontFamily: {
        "sora": ["Sora", "sans-serif"],
      }
    },
  },
  plugins: [],
}

