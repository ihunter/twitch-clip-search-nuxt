// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-graphql-server',
    'nuxt-quasar-ui',
    '@nuxtjs/apollo',
    'dayjs-nuxt'
  ],

  dayjs: {
    plugins: ['customParseFormat']
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: `${process.env.BASE_URL}/api/graphql`
      }
    },
  },

  graphqlServer: {
    url: '/api/graphql',
    schema: './server/**/*.graphql',
  },

  runtimeConfig: {
    mongoURI: process.env.NUXT_MONGO_URI,
  },

  build: {
    // https://github.com/nuxt/nuxt/issues/12753
    // fix issue with tslib when built
    transpile: ['tslib'],
  },

  devtools: {
    enabled: true
  }
})
