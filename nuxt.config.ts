// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'dayjs-nuxt',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    mongodbUri: '',
    public: {
      limit: 24,
    },
  },

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

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 400,
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    },
    storage: 'cookies',
  },

  dayjs: {
    plugins: ['customParseFormat', 'utc', 'relativeTime', 'timezone', 'duration'],
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
