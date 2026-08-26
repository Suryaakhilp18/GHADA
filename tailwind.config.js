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
          bg: '#11131F',       // Rich vibrant midnight dark background
          card: '#1B1E2E',     // Bright elevated card surface
          elevated: '#24283D', // High contrast secondary surface
          border: '#363B54',   // Crisp, clear border visibility
        },
        ivory: {
          DEFAULT: '#FFFFFF',  // Pure crisp white for maximum legibility & brightness
          muted: '#E2E8F0',    // Bright readable text
          dark: '#94A3B8',     // High contrast secondary text
        },
        gold: {
          DEFAULT: '#F59E0B',  // Radiant Amber Gold
          light: '#FBBF24',    // Bright Gold highlight
          dark: '#D97706',     // Deep Gold
          glow: 'rgba(245, 158, 11, 0.25)',
        },
        bronze: {
          DEFAULT: '#B45309',
          dark: '#78350F',
        },
        terracotta: {
          DEFAULT: '#EF4444',  // Vibrant Coral Red for emergency alerts
          muted: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(245, 158, 11, 0.3)',
        'gold-sm': '0 0 12px rgba(245, 158, 11, 0.25)',
        'card-bright': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(245, 158, 11, 0.1)',
      }
    },
  },
  plugins: [],
}
