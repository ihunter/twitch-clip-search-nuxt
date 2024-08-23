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

const title = useRouteQuery('title', '', { transform: String })
const creator = useRouteQuery('creator', '', { transform: String })
const game = useRouteQuery('game', [])
const page = useRouteQuery('page', '1', { transform: Number })
const sort = useRouteQuery('sort', 'views', { transform: String })
const limit = useRouteQuery('limit', '12', { transform: Number })

const { data, status } = await useFetch<ClipResponse>(`/api/clips`, {
  query: {
    title,
    creator,
    game,
    page,
    sort,
    limit,
  },
  transform: transformClipResponse,
  lazy: true,
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <SearchInput />
        <v-btn-group
          tile
          divided
          variant="elevated"
          class="h-100 ml-4"
        >
          <SearchFilters />

          <SearchSort />
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row v-if="status === 'pending'">
      <v-col v-for="(_, index) in limit" :key="index" cols="12" sm="6" md="4" xl="2">
        <ClipCardSkeleton />
      </v-col>
    </v-row>
    <v-row v-else-if="data">
      <v-col v-for="clip in data.docs" :key="clip.id" cols="12" sm="6" md="4" xl="2">
        <ClipCard
          :id="clip.id"
          :url="clip.url"
          :title="clip.title"
          :view-count="clip.view_count"
          :broadcaster-id="clip.broadcaster_id"
          :broadcaster-name="clip.broadcaster_name"
          :creator-name="clip.creator_name"
          :thumbnail-url="clip.thumbnail_url"
          :game-id="clip.game?.id"
          :game-name="clip.game?.name"
          :game-box-art-url="clip.game?.box_art_url"
          :created-at="clip.created_at"
        />
      </v-col>
    </v-row>
    <v-row v-if="data">
      <v-col>
        <v-pagination v-model="page" :length="data.totalPages" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
