/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#1e1e1e',
        accent: '#d4af37', // Gold accent for luxury feel
        'accent-light': '#e5c76b',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
      fontFamily: {
        sans: ['var(--font-playfair)', 'var(--font-raleway)'],
        serif: ['var(--font-playfair)'],
        display: ['var(--font-raleway)'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode by default
}