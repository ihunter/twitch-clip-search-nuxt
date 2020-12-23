<template>
  <v-dialog v-model="filterMenu" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        value="Filter By"
        title="Filter By"
        v-on="on"
      >
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
          <v-col cols="12" md="10" xl="8">
            <v-row>
              <v-col cols="12">
                <BroadcasterFilter />
              </v-col>
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
                <CreatorFilter />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import BroadcasterFilter from '~/components/BroadcasterFilter'
import GameFilter from '~/components/GameFilter'
import StartDateFilter from '~/components/StartDateFilter'
import EndDateFilter from '~/components/EndDateFilter'
import CreatorFilter from '~/components/CreatorFilter'

export default {
  components: {
    BroadcasterFilter,
    GameFilter,
    StartDateFilter,
    EndDateFilter,
    CreatorFilter
  },
  data () {
    return {
      filterMenu: false
    }
  }
}
</script>

<style>
</style>
