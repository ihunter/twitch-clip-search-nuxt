<template>
  <!-- App.vue -->

  <v-app>
    <v-app-bar app prominent :src="require('~/assets/banner.webp')">
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
