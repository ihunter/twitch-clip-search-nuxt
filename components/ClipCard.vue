<script setup lang="ts">
import type { Date } from 'mongoose'

interface Clip {
  id: string
  url: string
  broadcasterId: string
  broadcasterName: string
  creatorName: string
  title: string
  viewCount: number
  createdAt: string
  thumbnailUrl: string
  gameName?: string
  gameBoxArtUrl?: string
}

const props = defineProps<Clip>()

// const dayjs = useDayjs()

// const timeFromNow = computed(() => dayjs(+props.createdAt).fromNow())

// const createdAtCalendar = computed(() =>
//   dayjs(+props.createdAt).format('M/D/YYYY'),
// )

// const createdAtTime = computed(() => dayjs(+props.createdAt).format('h:mm a'))

// const createdAtQueryParam = computed(() =>
//   dayjs(+props.createdAt).format('YYYY-MM-DD'),
// )

// const createdAtTimeQueryParam = computed(() =>
//   dayjs(+props.createdAt).format('HH:mm'),
// )

// const sizedGameBoxArtUrl = computed(() =>
//   props.game
//     ? props.game.box_art_url.replace(/\{width\}x\{height\}/, '52x72')
//     : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart-52x72.jpg',
// )

// const gameName = computed(() => (props.game ? props.game.name : ''))

// const { updateQuery } = useRouteQuery()
</script>

<template>
  <v-card tag="article" tile>
    <v-img
      :aspect-ratio="16 / 9"
      :src="thumbnailUrl"
      cover
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          />
        </div>
      </template>

      <template #error>
        <v-img
          src="~/assets/fireman.png"
        />
      </template>
    </v-img>

    <section class="d-flex">
      <div>
        <v-img
          width="52"
          height="72"
          lazy-src="~/assets/game_box_art_placeholder.jpg"
          :src="gameBoxArtUrl"
        >
          <template #placeholder>
            <v-img
              src="~/assets/game_box_art_placeholder.jpg"
              cover
            />
          </template>
        </v-img>
      </div>
      <div>
        <div>{{ title }}</div>
        <div>{{ gameName }}</div>
      </div>
    </section>
  </v-card>
</template>

<style scoped>

</style>
