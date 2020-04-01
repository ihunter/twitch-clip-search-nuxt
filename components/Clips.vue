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

export default {
  components: {
    Clip
  }
}
</script>

<style>

</style>
