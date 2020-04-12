<template>
  <v-row>
    <v-col
      v-for="clip in clips"
      :key="clip.id"
      cols="4"
    >
      <Clip
        :title="clip.title"
        :broadcaster-name="clip.broadcaster_name"
        :creator-name="clip.creator_name"
        :view-count="clip.view_count"
        :created-at="clip.created_at"
        :game="clip.game"
        :thumbnail-url="clip.thumbnail_url"
      />
    </v-col>
  </v-row>
</template>

<script>
import Clip from '@/components/Clip'

export default {
  components: {
    Clip
  },
  props: {
    clips: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
