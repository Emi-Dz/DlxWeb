/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'dark-background': '#1a0f2b',
        'dark-blue': '#2c215e',
        'accent-purple': '#6a1a9e',
        'light-text': '#e0e0e0',
        'button-bg': '#8a2be2',
        'button-hover': '#9b4bd8',
        'card-bg': '#3b2d67',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        slideInUp: 'slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        draw: 'draw 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
            to: { 'stroke-dashoffset': 0 }
        }
      }
    }
  },
  plugins: [],
}
