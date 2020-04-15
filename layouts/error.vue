<template>
  <v-app dark>
    <v-row justify="center">
      <div class="text-center">
        <img :src="require('~/assets/404.png')">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>

        <h1 v-else>
          {{ otherError }}
        </h1>

        <v-btn
          color="primary"
          x-large
          nuxt
          to="/"
        >
          Back
        </v-btn>
      </div>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  max-width: 400px;
  height: auto;
}

h1 {
  font-size: 8rem;
}
</style>
