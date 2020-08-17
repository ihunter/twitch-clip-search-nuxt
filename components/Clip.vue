<template>
  <v-card tag="article">
    <a :href="url" target="_blank" rel="noopener noreferrer nofollow">
      <v-img
        min-height="200"
        :src="thumbnailUrl"

        class="hover-effect grey darken-1"
      >
        <div class="clip-info view-count">
          {{ viewCount }} views
        </div>
        <div class="clip-info time-ago">
          {{ createdAtTimeAgo }}
        </div>
      </v-img>
    </a>

    <div class="d-flex mt-2">
      <div class="mr-2">
        <v-skeleton-loader
          v-if="gameBoxArtLoading"
          tile
          width="52"
          height="72"
          type="image"
        />
        <v-img
          :title="gameName"
          :src="sizedGameBoxArtUrl"
          class="d-block"
          @load="gameBoxArtLoading = false"
        />
      </div>

      <div class="clip-meta-container">
        <div
          :title="title"
          class="clip-title text-truncate"
        >
          {{ title }}
        </div>
        <div class="clip-meta-info">
          <div
            :title="broadcasterName"
            class="text-truncate"
          >
            {{ broadcasterName }}
          </div>
          <div
            :title="clippedByInfo"
            class="text-truncate"
          >
            {{ clippedByInfo }}
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    broadcasterName: {
      type: String,
      required: true
    },
    creatorName: {
      type: String,
      required: true
    },
    viewCount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    game: {
      type: Object,
      default: null
    },
    thumbnailUrl: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      gameBoxArtLoading: true
    }
  },
  computed: {
    createdAtTimeAgo () {
      return moment(+this.createdAt).fromNow()
    },
    createdAtCalendar () {
      return moment(+this.createdAt).calendar()
    },
    sizedGameBoxArtUrl () {
      return this.game ? this.game.box_art_url.replace(/{width}x{height}/, '52x72') : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart-52x72.jpg'
    },
    gameName () {
      return this.game ? this.game.name : ''
    },
    clippedByInfo () {
      return `Clipped by ${this.creatorName} on ${this.createdAtCalendar}`
    }
  },
  methods: {
  }
}
</script>

<style>
.clip-info {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 0.5rem;
  margin: 0.5rem;
  bottom: 0;
}

.view-count {
  left: 0;
}

.time-ago {
  right: 0;
}

.clip-title {
  font-size: 1.2rem;
}

.clip-meta-container {
  overflow: hidden;
}

.clip-meta-info {
  font-size: 0.8rem;
  color: #c3c3c3;
}

.hover-effect {
  overflow: visible;
  transition: 300ms transform;
}

.hover-effect:hover {
  transform: translate(5px, -5px);
}

.hover-effect::before {
  content: '';
  position: absolute;
  background-color: var(--v-primary-base);;
  width: 0;
  height: calc(100% + 1px);
  top: 0;
  left: 0;
  transform: skewY(-45deg);
  transition: 300ms width, 300ms top, 300ms left;
}

.hover-effect:hover::before {
  width: 5px;
  top: 3px;
  left: -5px;
}

.hover-effect::after {
  content: '';
  position: absolute;
  background-color: var(--v-primary-base);;
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  transition: 300ms height, 300ms bottom, 300ms left;
  transform: skewX(-45deg);
}

 .hover-effect:hover::after {
  height: 5px;
  bottom: -5px;
  left: -2px;
}
</style>
