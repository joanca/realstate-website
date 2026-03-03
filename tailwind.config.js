/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#bd760c',
        'brand-blue': '#b6cce4',
        'brand-cream-light': '#fffaf3',
        'brand-cream-dark': '#ffeed4',
        'text-dark': '#3a3a3a',
        'text-green': '#032b21',
      },
      fontFamily: {
        'archivo': ['"Archivo"', 'sans-serif'],
        'archivo-condensed': ['"Archivo Condensed"', 'sans-serif'],
        'archivo-semi-expanded': ['"Archivo SemiExpanded"', 'sans-serif'],
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}