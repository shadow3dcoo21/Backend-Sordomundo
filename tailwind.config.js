/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-cel': '#38AEC7', // Nombre que quieras para el color personalizado
      },
    },
  },
  plugins: [],
};
