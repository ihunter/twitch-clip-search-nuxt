<script setup>
const dayjs = useDayjs()
const route = useRoute()
const { updateQuery } = useRouteQuery()

const startDateTime = computed(() => {
  const startTime = route.query.startTime
  const startDate = route.query.startDate

  if (startTime === undefined && startDate === undefined)
    return undefined

  if (startTime && startDate) {
    return dayjs(`${startDate} ${startTime}`, 'YYYY-M-D HH:mm')
  }

  return dayjs(startDate, 'YYYY-M-D').startOf('day')
})

const endDatetime = computed(() => {
  const endTime = route.query.endTime
  const endDate = route.query.endDate

  if (endTime === undefined && endDate === undefined)
    return undefined

  if (endTime && endDate) {
    return dayjs(`${endDate} ${endTime}`, 'YYYY-M-D HH:mm')
  }

  return dayjs(endDate, 'YYYY-M-D').endOf('day')
})

const sortTypes = [
  { title: 'Most views', value: 1 },
  { title: 'Date added (oldest)', value: 2 },
  { title: 'Date added (newest)', value: 3 },
  { title: 'Relevance (title)', value: 4 },
]

const page = computed({
  get() {
    return +route.query.page || 1
  },
  set(pageNumber) {
    updateQuery({ page: pageNumber })
  },
})

const openFilterDialog = ref(false)
</script>

<template>
  <h1>HOME PAGE</h1>
</template>

<style scoped>

</style>
