<script setup lang="ts">
const sortTypes = [
  { title: 'Most views', value: 'views' },
  { title: 'Date added (oldest)', value: 'oldest' },
  { title: 'Date added (newest)', value: 'newest' },
  { title: 'Relevance (title)', value: 'title' },
]

const sort = useRouteQuery('sort', 'views', { transform: String })
</script>

<template>
  <v-btn id="sort-menu-activator" aria-label="Sort" icon="mdi-sort-variant" />

  <v-menu activator="#sort-menu-activator">
    <v-list>
      <v-list-item
        v-for="(item, index) in sortTypes"
        :key="index"
        :value="index"
        @click="sort = item.value"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>
