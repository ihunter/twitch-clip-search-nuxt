<script setup>
const dayjs = useDayjs();
const route = useRoute();

const startDateTime = computed(() => {
  const startTime = route.query.startTime;
  const startDate = route.query.startDate;

  if (startTime === undefined && startDate === undefined) return undefined;

  if (startTime && startDate) {
    return dayjs(`${startDate} ${startTime}`, "YYYY-M-D HH:mm");
  }

  return dayjs(startDate, "YYYY-M-D").startOf("day");
});

const endDatetime = computed(() => {
  const endTime = route.query.endTime;
  const endDate = route.query.endDate;

  if (endTime === undefined && endDate === undefined) return undefined;

  if (endTime && endDate) {
    return dayjs(`${endDate} ${endTime}`, "YYYY-M-D HH:mm");
  }

  return dayjs(endDate, "YYYY-M-D").endOf("day");
});

const query = gql`
  query getClips(
    $title: String
    $broadcaster: String
    $game: [String]
    $startDate: String
    $endDate: String
    $limit: Int
    $page: Int
    $sort: Int
    $creator: String
  ) {
    getClips(
      query: {
        title: $title
        broadcaster: $broadcaster
        game: $game
        startDate: $startDate
        endDate: $endDate
        limit: $limit
        page: $page
        sort: $sort
        creator: $creator
      }
    ) {
      clips {
        title
        broadcaster_name
        creator_name
        view_count
        created_at
        game {
          id
          name
          box_art_url
        }
        thumbnail_url
        url
      }
      count
    }
  }
`;

const variables = {
  title: route.query.title,
  game: route.query.game,
  broadcaster: route.query.broadcaster,
  startDate: startDateTime.value,
  endDate: endDatetime.value,
  limit: +route.query.limit,
  page: +route.query.page,
  sort: +route.query.sort,
  creator: route.query.creator,
};

const { data } = await useAsyncQuery(query, variables);
</script>

<template>
  <h1>HOME</h1>
  <ol>
    <li v-for="clip in data.getClips.clips" :key="clip.id">
      {{ clip.title }}
    </li>
  </ol>
</template>

<style scoped></style>
