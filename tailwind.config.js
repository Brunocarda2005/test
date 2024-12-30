/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-quinto": "#121212",
        "color-sexto": "#151516",
        "color-secundario": "#5c77ff",
        "box-shadow": "0 0 10px 2px #0000002f",
        "outline": "#ffffff0d",
        "color-principal": "#d8d8d8",
        "color-terciario": "#858585"
      },
    },
  },
  plugins: [],
};
