/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary), 0.05)',
          100: 'rgb(var(--color-primary), 0.1)',
          200: 'rgb(var(--color-primary), 0.2)',
          300: 'rgb(var(--color-primary), 0.3)',
          400: 'rgb(var(--color-primary), 0.4)',
          500: 'rgb(var(--color-primary), 0.5)',
          600: 'rgb(var(--color-primary), 0.6)',
          700: 'rgb(var(--color-primary), 0.7)',
          800: 'rgb(var(--color-primary), 0.8)',
          900: 'rgb(var(--color-primary), 0.9)',
          950: 'rgb(var(--color-primary), 1)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary), 0.05)',
          100: 'rgb(var(--color-secondary), 0.1)',
          200: 'rgb(var(--color-secondary), 0.2)',
          300: 'rgb(var(--color-secondary), 0.3)',
          400: 'rgb(var(--color-secondary), 0.4)',
          500: 'rgb(var(--color-secondary), 0.5)',
          600: 'rgb(var(--color-secondary), 0.6)',
          700: 'rgb(var(--color-secondary), 0.7)',
          800: 'rgb(var(--color-secondary), 0.8)',
          900: 'rgb(var(--color-secondary), 0.9)',
          950: 'rgb(var(--color-secondary), 1)',
        },
        accent: {
          50: 'rgb(var(--color-accent), 0.05)',
          100: 'rgb(var(--color-accent), 0.1)',
          200: 'rgb(var(--color-accent), 0.2)',
          300: 'rgb(var(--color-accent), 0.3)',
          400: 'rgb(var(--color-accent), 0.4)',
          500: 'rgb(var(--color-accent), 0.5)',
          600: 'rgb(var(--color-accent), 0.6)',
          700: 'rgb(var(--color-accent), 0.7)',
          800: 'rgb(var(--color-accent), 0.8)',
          900: 'rgb(var(--color-accent), 0.9)',
          950: 'rgb(var(--color-accent), 1)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};