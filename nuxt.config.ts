// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['dayjs-nuxt', 'vuetify-nuxt-module', '@vueuse/nuxt'],

  app: {
    head: {
      title: 'Jerma Clip Search',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],

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
