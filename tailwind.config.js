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
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          text: '#212121',
          muted: '#666666',
          accent: '#1976D2',
          error: '#D32F2F',
          success: '#388E3C',
          border: '#e0e0e0',
          warning: '#FBC02D',
          focus: '#d3e3fd',
          hover: '#e2e4e8',
        },
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: '#E0E0E0',
          muted: '#A0A0A0',
          accent: '#4FC3F7',
          error: '#EF5350',
          success: '#66BB6A',
          border: '#2C2C2C',
          warning: '#FFEB3B',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  plugins: [],
}
