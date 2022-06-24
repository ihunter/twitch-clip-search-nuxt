<template>
  <v-card tag="article">
    <div class="clip-background">
      <a :href="url" target="_blank" rel="noopener noreferrer nofollow">
        <v-img
          min-height="200"
          :src="thumbnailUrl"
          class="hover-effect grey darken-1"
        >
          <div class="clip-info view-count">
            <v-icon left>mdi-eye-outline</v-icon> {{ formattedViewCount }} views
          </div>
          <div class="clip-info time-ago">
            {{ createdAtTimeAgo }}
          </div>
        </v-img>
      </a>
    </div>

    <div class="d-flex mt-2">
      <div class="mr-2 pointer" @click="updateQuery({ game: game.id })">
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
        <div :title="title" class="clip-title text-truncate">
          {{ title }}
        </div>
        <div class="clip-meta-info">
          <div :title="broadcasterName" class="text-truncate">
            {{ broadcasterName }}
          </div>
          <div
            :title="
              `Clipped by ${creatorName} on ${createdAtCalendar} at ${createdAtTime}`
            "
            class="text-truncate"
          >
            Clipped by
            <span
              class="pointer"
              @click="updateQuery({ creator: creatorName })"
              >{{ creatorName }}</span
            >
            on
            <span
              class="pointer"
              @click="
                updateQuery({ startDate: createdAtURL, endDate: createdAtURL })
              "
              >{{ createdAtCalendar }}</span
            >
            at
            <span
              class="pointer"
              @click="
                updateQuery({
                  startTime: createdAtTimeURL
                })
              "
              >{{ createdAtTime }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
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
      default: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    },
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    gameBoxArtLoading: true
  }),
  computed: {
    formattedViewCount() {
      return parseInt(this.viewCount).toLocaleString();
    },
    createdAtTimeAgo() {
      return moment(+this.createdAt).fromNow();
    },
    createdAtCalendar() {
      return moment(+this.createdAt).format("M/D/YYYY");
    },
    createdAtURL() {
      return moment(+this.createdAt).format("YYYY-MM-DD");
    },
    createdAtTime() {
      return moment(+this.createdAt).format("h:mm a");
    },
    createdAtTimeURL() {
      return moment(+this.createdAt).format("HH:mm");
    },
    sizedGameBoxArtUrl() {
      return this.game
        ? this.game.box_art_url.replace(/{width}x{height}/, "52x72")
        : "https://static-cdn.jtvnw.net/ttv-static/404_boxart-52x72.jpg";
    },
    gameName() {
      return this.game ? this.game.name : "";
    }
  }
};
</script>

<style lang="scss">
:root {
  --border-size: 5px;
}

.pointer {
  cursor: pointer;
}

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

.clip-background {
  background-color: var(--v-primary-base);
}

.hover-effect {
  overflow: visible;
  transition: transform 300ms ease;
}

.hover-effect:hover {
  transform: translate(var(--border-size), calc(-1 * var(--border-size)));
}

.hover-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-top: var(--border-size) solid transparent;
  border-bottom: var(--border-size) solid transparent;
  border-right: var(--border-size) solid var(--v-primary-base);
  transform-origin: left center;
  transform: translateY(calc(-1 * var(--border-size))) scale(0);
  transition: transform 300ms ease;
}

.hover-effect:hover::before {
  transform: translateX(calc(-1 * var(--border-size))) scale(1);
}

.hover-effect::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-left: var(--border-size) solid transparent;
  border-right: var(--border-size) solid transparent;
  border-top: var(--border-size) solid var(--v-primary-base);
  transform-origin: center bottom;
  transform: translateX(var(--border-size)) scale(0);
  transition: transform 300ms ease;
}

.hover-effect:hover::after {
  transform: translateY(var(--border-size)) scale(1);
}
</style>
