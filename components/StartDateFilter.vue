<script setup lang="ts">
const dayjs = useDayjs()
const adapter = useDate()

const startDateQuery = useRouteQuery('startDate', '', { transform: String })

const startDate = computed({
  get() {
    return adapter.parseISO(startDateQuery.value)
  },
  set(value: Date) {
    startDateQuery.value = dayjs(value).format('YYYY-MM-DD')
  },
})
</script>

<template>
  <v-date-picker v-model="startDate" header="Enter Start Date" />
</template>

<style scoped>

</style>
