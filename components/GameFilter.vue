<template>
  <v-autocomplete
    v-model="game"
    label="Game"
    :items="allGames"
    item-text="name"
    item-value="id"
    :loading="$apollo.loading"
    :disabled="$apollo.loading"
    chips
    deletable-chips
    multiple
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
      game: this.$route.query.game,
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
  }
}
</script>
