<script setup lang="ts">
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

const dayjs = useDayjs()

const timeFromNow = computed(() => dayjs(props.createdAt).fromNow())

const createdAtCalendar = computed(() =>
  dayjs(props.createdAt).format('M/D/YYYY'),
)

const createdAtTime = computed(() => dayjs(props.createdAt).format('h:mm a'))

// const createdAtQueryParam = computed(() =>
//   dayjs(+props.createdAt).format('YYYY-MM-DD'),
// )

// const createdAtTimeQueryParam = computed(() =>
//   dayjs(+props.createdAt).format('HH:mm'),
// )

// const gameName = computed(() => (props.game ? props.game.name : ''))

// const { updateQuery } = useRouteQuery()
</script>

<template>
  <v-card tag="article" tile class="overflow-visible">
    <div class="hover-effect-container">
      <div class="hover-effect">
        <v-img
          :aspect-ratio="16 / 9"
          :src="thumbnailUrl"
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
            <v-img src="~/assets/images/fireman.png" />
          </template>
        </v-img>
      </div>
    </div>
    <section class="d-flex">
      <div>
        <v-img
          width="52"
          height="72"
          lazy-src="~/assets/images/game_box_art_placeholder.jpg"
          :src="gameBoxArtUrl"
        >
          <template #placeholder>
            <v-img src="~/assets/images/game_box_art_placeholder.jpg" cover />
          </template>
        </v-img>
      </div>
      <div class="px-2 overflow-hidden">
        <h4 class="text-truncate">
          {{ title }}
        </h4>
        <div class="text-subtitle-2">
          Clipped by {{ creatorName }}
        </div>
        <div class="text-subtitle-2">
          on {{ createdAtCalendar }} at {{ createdAtTime }}
        </div>
      </div>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
$border-size: 5px;
$border-color: rgb(43, 255, 0);
$transition-duration: 300ms;
$transition-function: ease-in;

.bg-opacity {
  background-color: rgba(0, 0, 0, .5);
}

.hover-effect-container {
  transition: background-color 0s linear calc($transition-duration - 50ms);
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
