// nuxt.config.ts

export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css', // <-- Ton CSS avec Tailwind
    'vue3-easy-data-table/dist/style.css'
  ],

  modules: ['@pinia/nuxt'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, // ✅ Tailwind v4
      autoprefixer: {}
    }
  },

  compatibilityDate: '2025-04-24'
})
