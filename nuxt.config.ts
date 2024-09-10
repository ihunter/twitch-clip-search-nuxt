// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'vuetify-nuxt-module', '@vueuse/nuxt'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Jerma Clip Search',
      meta: [
        { name: 'description', content: 'Search for twitch clips of Jerma985 by title, game, and date.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],

    },
  },

  components: [{
    path: '~/components',
    pathPrefix: false,
  },
  ],

  runtimeConfig: {
    mongodbUri: '',
  },

  dayjs: {
    plugins: ['customParseFormat', 'relativeTime'],
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          dark: {
            colors: {
              primary: '#0AFC9E',
              secondary: '#1D4435',
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
