<template>
  <!-- App.vue -->

  <v-app>
    <v-app-bar
      app
      prominent
      shrink-on-scroll
      color="primary"
      :src="require('~/assets/banner.png')"
    >
      <v-spacer class="hidden-md-and-down" />
      <Search />
      <v-btn-toggle color="primary" class="ml-2">
        <SearchFilters />
        <SearchSort />
      </v-btn-toggle>
      <v-spacer class="hidden-md-and-down" />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Search from '~/components/Search'
import SearchFilters from '~/components/SearchFilters'
import SearchSort from '~/components/SearchSort'

export default {
  components: {
    Search,
    SearchFilters,
    SearchSort
  }
}
</script>
