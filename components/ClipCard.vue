<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  broadcasterName: {
    type: String,
    required: true,
  },
  creatorName: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  game: {
    type: Object,
    default: null,
  },
  thumbnailUrl: {
    type: String,
    default: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
  },
  url: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <q-card square flat bordered>
    <q-img :src="thumbnailUrl">
      <div class="absolute-bottom flex justify-between">
        <div>
          {{ viewCount }}
        </div>
        <div>TIME AGO</div>
      </div>
    </q-img>

    <q-card-section>
      <div>{{ title }}</div>
      <div>{{ broadcasterName }}</div>
      <div>Clipped by {{ creatorName }} on {{ createdAt }}</div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
