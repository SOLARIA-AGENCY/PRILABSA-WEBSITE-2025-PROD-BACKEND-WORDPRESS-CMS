module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Gotham',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'prilabsa-orange-primary': '#e17e01',
        'prilabsa-orange-secondary': '#E17E01',
        'prilabsa-blue-primary': '#00246a',
        'prilabsa-blue-secondary': '#00246A',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};