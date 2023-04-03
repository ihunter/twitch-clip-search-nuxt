// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-server',
  ],
  graphqlServer: {
    url: '/api/graphql',
    schema: './server/**/*.graphql',
  },
  runtimeConfig: {
    mongoURI: process.env.NUXT_MONGO_URI,
  }
})
