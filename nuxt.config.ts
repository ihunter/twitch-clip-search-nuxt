// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-graphql-server',
    'nuxt-quasar-ui'
  ],

  graphqlServer: {
    url: '/api/graphql',
    schema: './server/**/*.graphql',
  },

  runtimeConfig: {
    mongoURI: process.env.NUXT_MONGO_URI,
  },

  devtools: {
    enabled: true
  }
})
