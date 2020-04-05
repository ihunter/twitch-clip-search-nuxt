<template>
  <v-row>
    <v-col
      v-for="clip in 12"
      :key="clip"
      cols="4"
    >
      <Clip />
    </v-col>
  </v-row>
</template>

<script>
import Clip from '@/components/Clip'

import { mapActions } from 'vuex'

export default {
  components: {
    Clip
  },
  methods: {
    ...mapActions({
      fetchClips: 'clips/fetchClips'
    })
  },
  async fetch () {
    await this.fetchClips()
  }
}
</script>

<style>

</style>
