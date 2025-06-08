// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode based on 'class'
  theme: {
    extend: {
      colors: {
        // Загальні кольори для вашої темної теми
        // Світла тема (основна)
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          text: '#212121',
          muted: '#666666',
          accent: '#1976D2',
          error: '#D32F2F',
          success: '#388E3C',
          border: '#e0e0e0',
          warning: '#FBC02D', // Світло-оранжевий для світлої теми
        },
        // Темна тема
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: '#E0E0E0',
          muted: '#A0A0A0',
          accent: '#4FC3F7',
          error: '#EF5350',
          success: '#66BB6A',
          border: '#2C2C2C',
          warning: '#FFEB3B', // Жовтий для темної теми
        },
        // Ви також можете визначити основні кольори, які будуть застосовуватися
        // як у світлій, так і в темній темі, якщо вони не змінюються,
        // або перевизначити стандартні кольори Tailwind.
        // Наприклад, ви можете переробити 'blue'
        blue: {
          '500': '#4FC3F7', // Варіант 1 (можна використати як 'blue-500')
          '400': '#90CAF9', // Варіант 2 (можна використати як 'blue-400')
        }
      },
      // Додайте тут налаштування шрифтів, якщо вони ще не були додані
      fontFamily: {
        sans: ['Roboto', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  plugins: [],
}
