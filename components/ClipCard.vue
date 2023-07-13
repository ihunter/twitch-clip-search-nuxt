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

const dayjs = useDayjs();

const timeFromNow = computed(() => dayjs(+props.createdAt).fromNow());
</script>

<template>
  <a :href="url">
    <q-card square flat bordered>
      <q-img :src="thumbnailUrl">
        <div class="absolute-bottom flex justify-between">
          <div>
            <q-icon name="visibility" left size="1.3rem" />{{
              viewCount.toLocaleString()
            }}
            views
          </div>
          <div>{{ timeFromNow }}</div>
        </div>
      </q-img>

      <q-card-section>
        <div>{{ title }}</div>
        <div>{{ broadcasterName }}</div>
        <div>Clipped by {{ creatorName }} on {{ createdAt }}</div>
      </q-card-section>
    </q-card>
  </a>
</template>

<style scoped></style>
