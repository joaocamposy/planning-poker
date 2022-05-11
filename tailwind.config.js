const defaultTheme = require('tailwindcss/defaultTheme');
const safelist = [];

for (let index = 1; index <= 10; index++) {
  safelist.push(`w-${index}`, `h-${index}`);
}

module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  safelist,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent': 'var(--accent)',
        'accent-darken': 'var(--accent-darken)',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
