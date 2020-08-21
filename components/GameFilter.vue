<template>
  <v-autocomplete
    v-model="game"
    :search-input.sync="search"
    label="Game"
    :items="allGames"
    item-text="name"
    item-value="id"
    :loading="$apollo.loading"
    :no-data-text="noDataText"
    cache-items
    multiple
    chips
    deletable-chips
    clearable
    outlined
    filled
    @change="updateQuery({ game })"
    @click:clear="updateQuery({ game: undefined })"
  />
</template>

<script>
import gql from 'graphql-tag'

import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data () {
    return {
      search: null,
      gameQuery: this.$route.query.game,
      noDataText: 'Search for a game by title'
    }
  },
  computed: {
    game: {
      get () {
        if (!this.gameQuery) return null

        if (Array.isArray(this.gameQuery)) {
          return this.gameQuery
        }

        return [this.gameQuery]
      },
      set (val) {
        this.gameQuery = val
      }
    }
  },
  apollo: {
    allGames: {
      query: gql`query allGames(
        $broadcaster: String
        $name: String
        $game: [String]
        ) {
          allGames (query: {
            broadcasterID: $broadcaster
            name: $name
            gameID: $game
          }) {
            id
            name
          }
      }`,
      variables () {
        return {
          broadcaster: this.$route.query.broadcaster,
          name: this.search,
          game: this.game
        }
      },
      debounce: 300
    }
  }
}
</script>
