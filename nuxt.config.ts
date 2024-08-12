// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'nuxt-mongoose', 'vuetify-nuxt-module'],

  dayjs: {
    plugins: ['customParseFormat', 'relativeTime'],
  },

  vuetify: {
    moduleOptions: {

    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
      },
    },
  },

  compatibilityDate: '2024-08-08',
})
