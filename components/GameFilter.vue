<template>
  <div>
    <v-autocomplete
      v-model="game"
      :search-input.sync="search"
      label="Game"
      prepend-inner-icon="mdi-controller-classic"
      :items="allGames"
      item-text="name"
      item-value="id"
      :loading="$apollo.loading"
      :no-data-text="noDataText"
      cache-items
      multiple
      chips
      deletable-chips
      small-chips
      clearable
      outlined
      @change="updateQuery({ game })"
      @click:clear="updateQuery({ game: undefined })"
    >
      <template v-slot:item="data">
        <template>
          <v-list-item-avatar tile left width="60" height="80">
            <img :src="boxArtURL(data.item.box_art_url)" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import gql from "graphql-tag";

import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  data() {
    return {
      search: null,
      game: this.$route.query.game,
      noDataText: "Search for a game by title"
    };
  },
  watch: {
    "$route.query.game": {
      handler(val) {
        if (!Array.isArray(val)) {
          this.game = [val];
        } else {
          this.game = val;
        }
      }
    }
  },
  methods: {
    boxArtURL(url) {
      return url.replace("{width}x{height}", "150x200");
    }
  },
  apollo: {
    allGames: {
      query: gql`
        query allGames($broadcaster: String, $name: String, $game: [String]) {
          allGames(
            query: { broadcasterID: $broadcaster, name: $name, gameID: $game }
          ) {
            id
            name
            box_art_url
          }
        }
      `,
      variables() {
        return {
          broadcaster: this.$route.query.broadcaster,
          name: this.search,
          game: this.game
        };
      },
      debounce: 300
    }
  }
};
</script>
