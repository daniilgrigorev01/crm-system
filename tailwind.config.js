/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/index.html', './client/css/**/*.css', './client/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        txt_grey: '#b0b0b0',
        black: '#333',
        firm: '#9873ff',
      },
      spacing: {
        '15': '3.75rem',
      },
    },
    fontFamily: {
      body: ['Open Sans', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};
