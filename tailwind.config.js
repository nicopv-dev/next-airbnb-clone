/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#65EFA8',
        white: '#fff',
        black: '#000',
        grey: '#717171',
        grey_light: '#BCBCBC',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
