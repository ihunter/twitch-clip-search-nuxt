<template>
  <v-card>
    <v-card-text>
      <div>Title: {{ search.title }}</div>
      <div>Game: {{ gameNames }}</div>
      <div>Creator: {{ search.creator_name }}</div>
      <div>Start Date: {{ startDate }}</div>
      <div>End Date: {{ endDate }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    search: {
      type: Object
    }
  },
  computed: {
    gameNames() {
      return this.search.games.map(game => game.name).join(", ");
    },
    startDate() {
      if (!this.search.startDate) return "";
      return moment(+this.search.startDate);
    },
    endDate() {
      if (!this.search.endDate) return "";
      return moment(+this.search.endDate);
    }
  }
};
</script>

<style></style>
