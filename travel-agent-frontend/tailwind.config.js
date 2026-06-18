/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF8F3',
          100: '#F5EFE6',
          200: '#EADFCD',
          300: '#DCC9AC',
        },
        espresso: {
          700: '#4A3B2E',
          800: '#3A2E23',
          900: '#2A2017',
        },
        clay: {
          400: '#C8865A',
          500: '#B5703F',
          600: '#9A5A2E',
        },
        olive: {
          500: '#6B7355',
          600: '#56603F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(58,46,35,0.18)',
        card: '0 4px 24px -8px rgba(58,46,35,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
