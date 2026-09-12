/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#f7f7f6',
          100: '#eeeeed',
          200: '#d9d9d6',
          300: '#b8b8b4',
          400: '#919190',
          500: '#74746f',
          600: '#5c5c58',
          700: '#4a4a47',
          800: '#3e3e3c',
          900: '#363633',
          950: '#1c1c1b',
        },
        accent: '#2563eb',
        'accent-light': '#dbeafe',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
