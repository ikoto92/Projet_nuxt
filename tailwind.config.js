// tailwind.config.js
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  darkMode: 'class', // ✅ OBLIGATOIRE !
  theme: {
    extend: {}
  },
  plugins: []
}
