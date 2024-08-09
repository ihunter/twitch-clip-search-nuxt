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
    default: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
  },
  url: {
    type: String,
    required: true,
  },
})

const dayjs = useDayjs()

const timeFromNow = computed(() => dayjs(+props.createdAt).fromNow())

const createdAtCalendar = computed(() =>
  dayjs(+props.createdAt).format('M/D/YYYY'),
)

const createdAtTime = computed(() => dayjs(+props.createdAt).format('h:mm a'))

const createdAtQueryParam = computed(() =>
  dayjs(+props.createdAt).format('YYYY-MM-DD'),
)

const createdAtTimeQueryParam = computed(() =>
  dayjs(+props.createdAt).format('HH:mm'),
)

const sizedGameBoxArtUrl = computed(() =>
  props.game
    ? props.game.box_art_url.replace(/\{width\}x\{height\}/, '52x72')
    : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart-52x72.jpg',
)

const gameName = computed(() => (props.game ? props.game.name : ''))

const { updateQuery } = useRouteQuery()
</script>

<template>
  <div>
    <h1>CLIP</h1>
  </div>
</template>

<style scoped>

</style>
