// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'vuetify-nuxt-module', '@vueuse/nuxt'],

  app: {
    head: {
      title: 'Jerma Clip Search',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },

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
        themes: {
          dark: {
            colors: {
              primary: '#0AFC9E',
            },
          },
        },
      },
    },
  },

  typescript: {
    strict: false,
  },

  compatibilityDate: '2024-08-08',
})
