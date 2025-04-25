// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Prévisions Météo',
      short_name: 'Météo',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#3b82f6',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
