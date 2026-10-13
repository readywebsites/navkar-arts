/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EAE0CF',
          400: '#DDD0BC',
        },
        champagne: {
          DEFAULT: '#D8C3A5',
          light: '#EADBC8',
          dark: '#BFA482',
        },
        bronze: {
          light: '#D4B07B',
          DEFAULT: '#C39A58',
          dark: '#9E7638',
          deep: '#785521',
        },
        charcoal: {
          950: '#0B0B0B',
          900: '#121212',
          850: '#171717',
          800: '#1F1F1F',
          700: '#2A2A2A',
          600: '#3D3D3D',
          500: '#5A5A5A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}

