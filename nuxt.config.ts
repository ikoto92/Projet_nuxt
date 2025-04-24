export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
    'vue3-easy-data-table/dist/style.css'
  ],

  modules: ['@pinia/nuxt'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},  // ✅ plugin spécifique
      autoprefixer: {}
    }
  },

  compatibilityDate: '2025-04-24'
})
