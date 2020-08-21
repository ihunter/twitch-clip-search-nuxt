<template>
  <v-autocomplete
    v-model="broadcaster"
    label="Broadcaster"
    :items="allBroadcasters"
    item-text="display_name"
    item-value="id"
    clearable
    outlined
    filled
    :loading="$apollo.loading"
    :disabled="$apollo.loading"
    @change="updateQuery({ broadcaster })"
    @click:clear="updateQuery({ broadcaster: undefined})"
  />
</template>

<script>
import gql from 'graphql-tag'
import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data () {
    return {
      broadcaster: this.$route.query.broadcaster
    }
  },
  apollo: {
    allBroadcasters: {
      query: gql`query allBroadcasters {
        allBroadcasters {
          id
          display_name
        }
      }`
    }
  }
}
</script>
