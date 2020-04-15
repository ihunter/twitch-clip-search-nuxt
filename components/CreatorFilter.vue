<template>
  <v-autocomplete
    v-model="creator"
    label="Broadcaster"
    :items="allCreators"
    item-text="display_name"
    item-value="id"
    clearable
    :loading="$apollo.loading"
    :disabled="$apollo.loading"
    @change="updateQuery({ creator })"
    @click:clear="updateQuery({ creator: undefined})"
  />
</template>

<script>
import gql from 'graphql-tag'
import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data () {
    return {
      creator: this.$route.query.creator
    }
  },
  apollo: {
    allCreators: {
      query: gql`query allCreators {
        allCreators {
          id
          display_name
        }
      }`
    }
  }
}
</script>
