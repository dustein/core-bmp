/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Verifique se seus arquivos são .jsx ou .tsx
  ],
  theme: {
    extend: {
      fontSize: {
        maiuscula: '0.5rem',
        minuscula: '0.8rem',
      },
    },
  },
  plugins: [],
}