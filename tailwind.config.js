/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        // Dark theme specific colors
        'dark-bg': '#222831',
        'dark-surface': '#31363F',
        'dark-primary': '#76ABAE',
        'dark-text': '#EEEEEE',
      },
      backgroundColor: {
        'theme-bg': 'var(--background)',
        'theme-surface': 'var(--surface)',
      },
      textColor: {
        'theme-primary': 'var(--text-primary)',
        'theme-secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'theme': 'var(--border)',
      },
    },
  },
  plugins: [],
}