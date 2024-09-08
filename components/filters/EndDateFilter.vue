<script setup lang="ts">
const dayjs = useDayjs()
const adapter = useDate()
const endDateQuery = useRouteQuery('endDate', '', { transform: String })

const endDate = computed({
  get() {
    if (!endDateQuery.value)
      return null

    return adapter.parseISO(endDateQuery.value)
  },
  set(value: Date) {
    if (!value)
      clearDate()

    endDateQuery.value = dayjs(value).format('YYYY-MM-DD')
  },
})

function clearDate() {
  endDateQuery.value = ''
}
</script>

<template>
  <div>
    <v-date-picker v-model="endDate" title="End Date" header="Select End Date" />
    <v-btn color="primary" variant="tonal" @click="clearDate">
      clear date
    </v-btn>
  </div>
</template>

<style scoped>

</style>
