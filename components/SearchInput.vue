<script setup>
const page = useRouteQuery('page', '1', { transform: Number })
const title = useRouteQuery('title', '', { transform: String })
const search = ref(title.value)

function searchTitle() {
  title.value = search.value
  page.value = 1
}

function clearTitle() {
  title.value = ''
  page.value = 1
}
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
    @keydown.enter="searchTitle"
    @click:clear="clearTitle"
  />
</template>
