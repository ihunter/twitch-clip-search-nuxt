<script setup lang="ts">
// const dayjs = useDayjs()
// const route = useRoute()
// const { updateQuery } = useRouteQuery()

// const startDateTime = computed(() => {
//   const startTime = route.query.startTime
//   const startDate = route.query.startDate

//   if (startTime === undefined && startDate === undefined)
//     return undefined

//   if (startTime && startDate) {
//     return dayjs(`${startDate} ${startTime}`, 'YYYY-M-D HH:mm')
//   }

//   return dayjs(startDate, 'YYYY-M-D').startOf('day')
// })

// const endDatetime = computed(() => {
//   const endTime = route.query.endTime
//   const endDate = route.query.endDate

//   if (endTime === undefined && endDate === undefined)
//     return undefined

//   if (endTime && endDate) {
//     return dayjs(`${endDate} ${endTime}`, 'YYYY-M-D HH:mm')
//   }

//   return dayjs(endDate, 'YYYY-M-D').endOf('day')
// })

// const sortTypes = [
//   { title: 'Most views', value: 1 },
//   { title: 'Date added (oldest)', value: 2 },
//   { title: 'Date added (newest)', value: 3 },
//   { title: 'Relevance (title)', value: 4 },
// ]

// const page = computed({
//   get() {
//     return +route.query.page || 1
//   },
//   set(pageNumber) {
//     updateQuery({ page: pageNumber })
//   },
// })

// const openFilterDialog = ref(false)
import type { ClipResponse } from '~/types'

function gameBoxArtUrl(url: string) {
  // https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg
  return url.replace('{width}x{height}', '104x144')
}

function transformClipResponse(data: ClipResponse) {
  data.docs.forEach((doc) => {
    if (!doc.game)
      return

    doc.game.box_art_url = gameBoxArtUrl(doc.game.box_art_url)
  })

  return data
}

const { data } = await useFetch<ClipResponse>('/api/clips', {
  transform: transformClipResponse,
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="clip in data?.docs" :key="clip.id" cols="12" sm="6" md="4" xl="2">
        <ClipCard
          :id="clip.id"
          :url="clip.url"
          :title="clip.title"
          :view-count="clip.view_count"
          :broadcaster-id="clip.broadcaster_id"
          :broadcaster-name="clip.broadcaster_name"
          :creator-name="clip.creator_name"
          :thumbnail-url="clip.thumbnail_url"
          :game-name="clip.game?.name"
          :game-box-art-url="clip.game?.box_art_url"
          :created-at="clip.created_at"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
