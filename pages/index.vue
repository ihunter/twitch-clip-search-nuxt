<script setup lang="ts">
import type { ClipResponse } from '~/types'

const dayjs = useDayjs()

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
const startDate = useRouteQuery('startDate', '', { transform: String })
const endDate = useRouteQuery('endDate', '', { transform: String })
const startTime = useRouteQuery('startTime', '', { transform: String })
const endTime = useRouteQuery('endTime', '', { transform: String })
const page = useRouteQuery('page', '1', { transform: Number })
const sort = useRouteQuery('sort', 'views', { transform: String })
const limit = useRouteQuery('limit', '12', { transform: Number })

const startDatetime = computed(() => {
  if (!startDate.value) {
    return ''
  }

  if (Boolean(startTime.value) && Boolean(startDate.value)) {
    return dayjs(`${startDate.value} ${startTime.value}`, 'YYYY-MM-DD HH:mm').toString()
  }

  return dayjs(startDate.value, 'YYYY-MM-DD').startOf('day').toString()
})

const endDatetime = computed(() => {
  if (!endDate.value) {
    return ''
  }

  if (Boolean(endTime.value) && Boolean(endDate.value)) {
    return dayjs(`${endDate.value} ${endTime.value}`, 'YYYY-MM-DD HH:mm').toString()
  }

  return dayjs(endDate.value, 'YYYY-MM-DD').endOf('day').toString()
})

const { data, status } = await useFetch<ClipResponse>(`/api/clips`, {
  query: {
    title,
    creator,
    game,
    startDate: startDatetime,
    endDate: endDatetime,
    page,
    sort,
    limit,
  },
  transform: transformClipResponse,
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
      <v-col v-for="(_, index) in limit" :key="index" cols="12" sm="6" md="4" xl="3">
        <ClipCardSkeleton />
      </v-col>
    </v-row>
    <v-row v-else-if="data">
      <v-col v-for="clip in data.docs" :key="clip.id" cols="12" sm="6" md="4" xl="3">
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
        <v-pagination v-model="page" :length="data.totalPages" variant="elevated" size="55" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
