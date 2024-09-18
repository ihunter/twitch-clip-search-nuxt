<script setup lang="ts">
const page = useRouteQuery('page', '1', { transform: Number })
const creator = useRouteQuery('creator', '', { transform: String })
const debouncedCreator = ref(creator.value)

watchDebounced(debouncedCreator, (value) => {
  creator.value = value
  page.value = 1
}, {
  debounce: 500,
})
</script>

<template>
  <v-text-field
    v-model="debouncedCreator"
    label="Creator Name"
    prepend-inner-icon="mdi-account"
    autocomplete="off"
    clearable
    outlined
  />
</template>
