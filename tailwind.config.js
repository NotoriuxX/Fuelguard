/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Incluye todos los archivos JS, JSX, TS y TSX dentro de la carpeta src
    './public/index.html', // Incluye también el archivo index.html si estás utilizando Tailwind en él
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
