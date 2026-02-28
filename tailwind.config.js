/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepblue: {
          900: '#020617', // Very dark blue (almost black but with a blue tint)
          800: '#0f172a', // Slate 900
          700: '#1e293b', // Slate 800
        },
        ocean: {
          light: '#7dd3fc',   // Sky 300
          DEFAULT: '#0ea5e9', // Sky 500
          dark: '#0284c7',    // Sky 600
          glow: '#38bdf8',    // Sky 400 for neon glows
        }
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Playfair Display', 'serif'], 
      }
    },
  },
  plugins: [],
}