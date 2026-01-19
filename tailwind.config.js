/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#FFD700',
      },
      fontFamily: {
        'bengali': ['Li Ador Noirrit', 'serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '6rem' }],
        '9xl': ['8rem', { lineHeight: '8rem' }],
      },
      maxWidth: {
        '1440': '1440px',
      },
      spacing: {
        '18': '4.5rem',
        '32': '8rem',
      }
    },
  },
  plugins: [],
}
