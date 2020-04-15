<template>
  <v-text-field
    v-model="creator"
    label="Creator Name"
    clearable
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
