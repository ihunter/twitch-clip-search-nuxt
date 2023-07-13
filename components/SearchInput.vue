<script setup>
const route = useRoute();
const router = useRouter();

const title = ref(route.query.title);

function updateQuery(queryParams) {
  router.replace({
    query: {
      ...route.query,
      ...queryParams,
    },
  });
}
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
