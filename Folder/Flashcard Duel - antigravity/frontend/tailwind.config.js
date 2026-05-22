/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        display: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'], 
      },
      colors: {
        bg: {
          main: '#FCF8ED', // Keeping this for the dashboard fallback
          card1: '#FCEAB3',
          card2: '#D4EDDA',
          card3: '#F4C8E6',
          card4: '#D8D8F6',
        },
        premium: {
          cream: '#f7f6f3',
          charcoal: '#1f2125',
          black: '#0f1115',
          cyan: '#5fb5b9',
          purple: '#8b78eb',
          coral: '#f68c8c',
          slate: '#64748B',
          yellow: '#f5b041',
        },
        primary: {
          DEFAULT: '#111111', 
          hover: '#333333',
        },
        text: {
          main: '#111111',
          muted: '#64748B',
        },
        success: '#10b981',
        danger: '#ef4444',
      },
      boxShadow: {
        'neo': '0 8px 30px rgba(0,0,0,0.04)',
        'cinematic': '0 0 50px rgba(0,0,0,0.5)',
        'holographic': '0 0 40px rgba(95,181,185,0.3), 0 0 80px rgba(139,120,235,0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
