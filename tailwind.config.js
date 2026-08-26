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
          bg: '#0A0B10',       // Deep Obsidian Black
          card: '#131520',     // Premium Glass Slate Surface
          elevated: '#1C1F2E', // Secondary Elevated Surface
          border: '#2A2E45',   // Subtle Luminous Border
        },
        ivory: {
          DEFAULT: '#FFFFFF',  // Pure Crisp White
          muted: '#E2E8F0',    // Soft Readable White
          dark: '#94A3B8',     // Muted Silver Text
        },
        gold: {
          DEFAULT: '#E5B869',  // Champagne Gold
          light: '#F5D089',    // Light Gold Highlight
          dark: '#C49845',     // Deep Gold Accent
          glow: 'rgba(229, 184, 105, 0.2)',
        },
        bronze: {
          DEFAULT: '#9E8050',
          dark: '#6E5834',
        },
        terracotta: {
          DEFAULT: '#EF4444',  // Vibrant Coral Red for Emergency Alerts
          muted: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(229, 184, 105, 0.25)',
        'gold-sm': '0 0 12px rgba(229, 184, 105, 0.2)',
        'card-bright': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 15px rgba(229, 184, 105, 0.08)',
      }
    },
  },
  plugins: [],
}
