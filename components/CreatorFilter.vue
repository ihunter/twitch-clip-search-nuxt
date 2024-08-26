<script setup lang="ts">
const creator = useRouteQuery('creator', '', { transform: String })
const debouncedCreator = ref(creator.value)

watchDebounced(debouncedCreator, (value) => {
  creator.value = value
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

<style scoped>

</style>\
