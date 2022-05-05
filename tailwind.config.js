module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent': 'var(--accent)',
        'accent-darken': 'var(--accent-darken)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
