<template>
  <v-autocomplete
    v-model="game"
    label="Game"
    :items="allGames"
    item-text="name"
    item-value="id"
    clearable
    @change="gameChanged"
    @click:clear="gameChanged(undefined)"
  />
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      game: this.$route.query.game
    }
  },
  apollo: {
    allGames: {
      query: gql`query allGames($broadcaster: String) {
        allGames (broadcasterID: $broadcaster) {
          id
          name
        }
      }`,
      variables () {
        return {
          broadcaster: this.$route.query.broadcaster
        }
      }
    }
  },
  methods: {
    gameChanged (game) {
      const query = { ...this.$route.query, game }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>
