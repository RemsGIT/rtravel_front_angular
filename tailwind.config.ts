/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          dark: '#4B955A'
        },
        danger: 'var(--red-500)',
        secondary: 'var(--gray-400)'
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

