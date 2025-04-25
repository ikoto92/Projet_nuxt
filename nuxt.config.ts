export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: ['@pinia/nuxt'], // ✅ virgule ajoutée ici
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
