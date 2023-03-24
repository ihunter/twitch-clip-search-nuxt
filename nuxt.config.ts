// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-server'
  ],
  graphqlServer: {
    url: '/api/graphql',
  },
  runtimeConfig: {
    mongoURI: process.env.MONGO_URI
  }
})
