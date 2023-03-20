require("dotenv").config();

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://clips.jerma.io"
    : process.env.BASE_URL;

const redirectSSL = require("redirect-ssl");
// const colors = require('vuetify/es5/util/colors').default

module.exports = {
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en",
    },
    title: "Jerma Clip Search",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Search for twitch clips of Jerma by title, game, and date",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "8a624e372b2b42baa0649413c7246f5e"}',
        body: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#0AFC9E" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/vue-gtag",
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://github.com/nuxt-community/apollo-module
    "@nuxtjs/apollo",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: BASE_URL,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${BASE_URL}/graphql`,
      },
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      options: {
        customProperties: true,
      },
      themes: {
        dark: {
          primary: "#0AFC9E",
          secondary: "#EC407A",
        },
      },
    },
  },
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === "production",
    }),
  ],
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
