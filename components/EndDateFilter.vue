<script setup lang="ts">
const dayjs = useDayjs()
const adapter = useDate()

const endDateQuery = useRouteQuery('endDate', '', { transform: String })

const endDate = computed({
  get() {
    return adapter.parseISO(endDateQuery.value)
  },
  set(value: Date) {
    endDateQuery.value = dayjs(value).format('YYYY-MM-DD')
  },
})
</script>

<template>
  <v-date-picker v-model="endDate" header="Select End Date" title="End Date" />
</template>

<style scoped>

</style>
