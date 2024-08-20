// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'vuetify-nuxt-module', '@vueuse/nuxt'],

  runtimeConfig: {
    mongodbUri: '',
  },

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
