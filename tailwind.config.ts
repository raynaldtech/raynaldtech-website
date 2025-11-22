/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    './composables/**/*.{js,ts}',
    './components/**/*.{js,vue,ts}',
    './pages/**/*.{js,vue,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#13775F', // Base color
          100: '#d4e8e3',
          200: '#a9d1c7',
          300: '#8FC4B5',
          400: '#52a38f',
          500: '#13775F', // Original primary
          600: '#0f5f4c',
          700: '#0b4739',
          800: '#083026',
          900: '#041813',
        },
        secondary: {
          DEFAULT: '#D70000',
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#f56565',
          500: '#D70000', // Your brand red
          600: '#c53030',
          700: '#9b2c2c',
          800: '#822727',
          900: '#63171b',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        accent: '#268974',
      },
      fontFamily: {
        heading: ['IBM Plex Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

