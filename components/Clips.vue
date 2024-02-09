<template>
  <v-row v-if="clips.length > 0" justify="center">
    <v-col v-for="clip in clips" :key="clip.id" cols="12" sm="6" md="4" xl="3">
      <Clip
        :title="clip.title"
        :broadcaster-name="clip.broadcaster_name"
        :creator-name="clip.creator_name"
        :view-count="clip.view_count"
        :created-at="clip.created_at"
        :game="clip.game"
        :thumbnail-url="clip.thumbnail_url"
        :url="clip.url"
      />
    </v-col>
  </v-row>
  <v-row v-else justify="center">
    <div>
      <v-img :src="require('~/assets/firedman.png')" />
      <h1>No Clips Here</h1>
    </div>
  </v-row>
</template>

<script>
import Clip from "@/components/Clip";

export default {
  components: {
    Clip,
  },
  props: {
    clips: {
      type: Array,
      required: true,
    },
  },
};
</script>
