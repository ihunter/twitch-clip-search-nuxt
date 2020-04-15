<template>
  <v-menu v-model="filterMenu" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon :ripple="{ center: true }" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <BroadcasterFilter />

        <GameFilter />

        <StartDateFilter />

        <EndDateFilter />

        <CreatorFilter />
      </v-card-text>
    </v-card>
  </v-menu>
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
