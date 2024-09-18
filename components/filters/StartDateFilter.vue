<script setup lang="ts">
const dayjs = useDayjs()
const adapter = useDate()

const page = useRouteQuery('page', '1', { transform: Number })
const startDateQuery = useRouteQuery('startDate', '', { transform: String })

const startDate = computed({
  get() {
    if (!startDateQuery.value)
      return null

    return adapter.parseISO(startDateQuery.value)
  },
  set(value: Date) {
    if (!value)
      clearDate()

    startDateQuery.value = dayjs(value).format('YYYY-MM-DD')
  },
})

function clearDate() {
  startDateQuery.value = ''
  page.value = 1
}
</script>

<template>
  <div>
    <v-date-picker v-model="startDate" title="Start Date" header="Select Start Date" />
    <v-btn color="primary" variant="tonal" @click="clearDate">
      clear date
    </v-btn>
  </div>
</template>
