/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/components/*.{js,jsx}",
    "./src/App.js",
    "./public/index.html",
    "node_modules/flowbite-react/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
