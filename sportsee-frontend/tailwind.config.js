/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "noir-sportsee": "#020203",
        "rouge-sportsee": "#FF0101",
      },
    },
  },
  plugins: [],
};
