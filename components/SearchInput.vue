<script setup>
const route = useRoute()

const title = ref(route.query.title)

const { updateQuery } = useRouteQuery()
</script>

<template>
  <div>
    <h1>SEARCH INPUT</h1>
  </div>
</template>

<style scoped></style>
