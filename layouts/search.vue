<template>
  <!-- App.vue -->

  <v-app>
    <v-app-bar
      app
      prominent
      shrink-on-scroll
      :src="require('~/assets/banner.webp')"
    >
      <v-row justify="center">
        <v-col sm="12" md="10" lg="8" xl="6" class="d-flex">
          <Search />
          <v-btn-toggle class="ml-2">
            <SearchFilters />
            <SearchSort />
          </v-btn-toggle>
        </v-col>
      </v-row>
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
import Search from "~/components/Search";
import SearchFilters from "~/components/SearchFilters";
import SearchSort from "~/components/SearchSort";

export default {
  components: {
    Search,
    SearchFilters,
    SearchSort
  }
};
</script>
