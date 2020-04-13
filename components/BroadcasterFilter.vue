<template>
  <v-autocomplete
    v-model="broadcaster"
    label="Broadcaster"
    :items="allBroadcasters"
    item-text="display_name"
    item-value="id"
    clearable
    @change="broadcasterChanged"
    @click:clear="broadcasterChanged(undefined)"
  />
</template>

<script>
import gql from 'graphql-tag'

export default {
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
  },
  methods: {
    broadcasterChanged (broadcaster) {
      const query = { ...this.$route.query, broadcaster }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>
