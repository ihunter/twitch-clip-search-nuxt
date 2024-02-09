<template>
  <v-dialog
    v-model="filterMenu"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :transition="transition"
    max-width="800"
    overlay-color="#5ED6E0"
  >
    <template v-slot:activator="{ on }">
      <v-btn value="Filter By" title="Filter By" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
        <span class="hidden-sm-and-down">Filter By</span>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar :src="require('~/assets/banner.webp')">
        <v-toolbar-title>Search Filters</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="filterMenu = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <GameFilter />
          </v-col>
          <v-col cols="12" md="6">
            <StartDateFilter />
          </v-col>
          <v-col cols="12" md="6">
            <EndDateFilter />
          </v-col>
          <v-col cols="12">
            <TimeFilter />
          </v-col>
          <v-col cols="12">
            <CreatorFilter />
          </v-col>
        </v-row>

        <v-btn @click="clearQuery">Clear All</v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import GameFilter from "~/components/GameFilter";
import StartDateFilter from "~/components/StartDateFilter";
import EndDateFilter from "~/components/EndDateFilter";
import CreatorFilter from "~/components/CreatorFilter";
import TimeFilter from "~/components/TimeFilter";

import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  components: {
    GameFilter,
    StartDateFilter,
    EndDateFilter,
    CreatorFilter,
    TimeFilter,
  },
  data() {
    return {
      filterMenu: false,
    };
  },
  computed: {
    transition() {
      return this.$vuetify.breakpoint.smAndDown
        ? "dialog-bottom-transition"
        : "scale-transition";
    },
  },
};
</script>

<style></style>
