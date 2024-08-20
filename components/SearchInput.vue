<script setup>
const title = useRouteQuery('title', '', { transform: String })
const search = ref(title.value)
</script>

<template>
  <v-text-field
    v-model="search"
    tile
    autofocus
    clearable
    persistent-clear
    hide-details
    variant="solo"
    prepend-inner-icon="mdi-magnify"
    placeholder="Search"
    @keydown.enter="title = search"
    @click:clear="title = ''"
  />
</template>

<style scoped></style>
