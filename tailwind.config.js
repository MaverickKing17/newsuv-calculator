/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enables dark mode with class="dark" (we toggle it in React)
  theme: {
    extend: {
      // You can add custom colors, fonts, etc. here later if you want
    },
  },
  plugins: [],
}
