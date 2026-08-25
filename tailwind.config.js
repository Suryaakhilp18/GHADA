/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0D0D0D',
          card: '#171717',
          elevated: '#222222',
          border: '#2A2A2A',
        },
        ivory: {
          DEFAULT: '#F6F1E8',
          muted: '#D1C9BC',
          dark: '#9A9285',
        },
        gold: {
          DEFAULT: '#D4AF6A',
          light: '#E6C88B',
          dark: '#B38F48',
          glow: 'rgba(212, 175, 106, 0.15)',
        },
        bronze: {
          DEFAULT: '#9E8050',
          dark: '#6E5834',
        },
        terracotta: {
          DEFAULT: '#A85D4D',
          muted: '#804235',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 106, 0.18)',
        'gold-sm': '0 0 10px rgba(212, 175, 106, 0.2)',
      }
    },
  },
  plugins: [],
}
