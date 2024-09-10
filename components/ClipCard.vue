<script setup lang="ts">
const props = defineProps<{
  id: string
  url: string
  broadcasterId: string
  broadcasterName: string
  creatorName: string
  title: string
  viewCount: number
  createdAt: string
  thumbnailUrl: string
  gameId?: string
  gameName?: string
  gameBoxArtUrl?: string
}>()

const dayjs = useDayjs()

const timeFromNow = computed(() => dayjs(props.createdAt).fromNow())

const createdAtCalendar = computed(() =>
  dayjs(props.createdAt).format('M/D/YYYY'),
)

const createdAtTime = computed(() => dayjs(props.createdAt).format('h:mm a'))

const creator = useRouteQuery('creator', '', { transform: String })
const game = useRouteQuery('game', '', { transform: String })
const startDate = useRouteQuery('startDate', '', { transform: String })
const endDate = useRouteQuery('endDate', '', { transform: String })
const startTime = useRouteQuery('startTime', '', { transform: String })

function setDateFilter() {
  startDate.value = dayjs(props.createdAt).format('YYYY-MM-DD')
  endDate.value = dayjs(props.createdAt).format('YYYY-MM-DD')
}

function setTimeFilter() {
  startTime.value = dayjs(props.createdAt).format('HH:mm')
}
</script>

<template>
  <v-card tag="article" class="overflow-visible">
    <div class="hover-effect-container" :href="url">
      <div class="hover-effect">
        <NuxtLink :to="url" target="_blank">
          <v-img
            :aspect-ratio="30 / 17"
            lazy-src="~/assets/images/clip_placeholder.png"
            :src="thumbnailUrl"
            :title="title"
            :alt="title"
            cover
          >
            <div class="d-flex flex-column justify-end h-100">
              <div class="pa-2 d-flex justify-space-between">
                <div class="px-2 bg-opacity">
                  <v-icon icon="mdi-eye-outline" /> {{ viewCount }}
                </div>
                <div class="px-2 bg-opacity">
                  {{ timeFromNow }}
                </div>
              </div>
            </div>
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate />
              </div>
            </template>
            <template #error>
              <v-img src="~/assets/images/clip_placeholder_404.png" />
            </template>
          </v-img>
        </NuxtLink>
      </div>
    </div>
    <section class="d-flex">
      <div class="filter">
        <v-img
          width="52"
          height="72"
          lazy-src="~/assets/images/game_box_art_placeholder.jpg"
          :src="gameBoxArtUrl"
          :title="gameName"
          :alt="`Game box art for ${gameName}`"
          @click="game = gameId ?? ''"
        >
          <template #placeholder>
            <v-img src="~/assets/images/game_box_art_placeholder.jpg" alt="placeholder" cover />
          </template>
        </v-img>
      </div>
      <div class="px-2 overflow-hidden">
        <h4 class="text-truncate" :title="title">
          {{ title }}
        </h4>
        <div class="text-subtitle-2" :title="`Clipped by ${creatorName}}`">
          Clipped by <span class="filter" @click="creator = creatorName">{{ creatorName }}</span>
        </div>
        <div class="text-subtitle-2" :title="`on ${createdAtCalendar} at ${createdAtTime}`">
          on <span class="filter" data-allow-mismatch @click="setDateFilter">{{ createdAtCalendar }}</span> at <span class="filter" data-allow-mismatch @click="setTimeFilter">{{ createdAtTime }}</span>
        </div>
      </div>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
$border-size: 5px;
$border-color: rgb(var(--v-theme-primary));
$transition-duration: 200ms;
$transition-function: ease-in;

a {
  color: white;
  text-decoration: none;
}

.filter {
  cursor: pointer;
}

.filter:hover {
  color: $border-color;
  text-decoration: underline;
}

.bg-opacity {
  background-color: rgba(0, 0, 0, .5);
}

.hover-effect-container {
  transition: background-color 0s $transition-function calc($transition-duration - 50ms);
}

.hover-effect-container:hover {
  background-color: $border-color;
  transition-delay: 100ms;
}

.hover-effect {
  will-change: transform;
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover {
  transform: translate3d($border-size, calc(-1 * $border-size), 0);
}

.hover-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-top: $border-size solid transparent;
  border-bottom: $border-size solid transparent;
  border-right: $border-size solid $border-color;
  transform-origin: left center;
  transform: translate3d(0, calc(-1 * $border-size), 0) scale(0);
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover::before {
  transform: translate3d(calc(-1 * $border-size), 0, 0) scale(1);
}

.hover-effect::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-left: $border-size solid transparent;
  border-right: $border-size solid transparent;
  border-top: $border-size solid $border-color;
  transform-origin: center bottom;
  transform: translate3d($border-size, 0, 0) scale(0);
  transition: transform $transition-duration $transition-function;
}

.hover-effect:hover::after {
  transform: translate3d(0, $border-size, 0) scale(1);
}
</style>
