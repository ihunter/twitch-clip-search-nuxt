// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'nuxt-mongoose'],

  dayjs: {
    plugins: ['customParseFormat', 'relativeTime'],
  },

  compatibilityDate: '2024-08-08',
})