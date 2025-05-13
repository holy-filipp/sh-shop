// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  routeRules: {
    '/cms/**': { proxy: `${process.env.API_BASE_URL}/**` },
  },
})
