/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./Components/**/*.{ts,tsx}",
    "./Layout/**/*.{ts,tsx}",
    './public/index.html',
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'darker-grey': '#3b3b3b',
        'grey-default': '#505050',
      }
    },
  },
  plugins: [],
}
