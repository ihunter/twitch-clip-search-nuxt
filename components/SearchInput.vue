<script setup>
const route = useRoute();

const title = ref(route.query.title);

const { updateQuery } = useRouteQuery();
</script>

<template>
  <q-input
    outlined
    square
    clearable
    v-model="title"
    label="Search"
    @keydown.enter="updateQuery({ title })"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<style scoped></style>
