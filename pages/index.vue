<script setup>
const dayjs = useDayjs();
const route = useRoute();
const router = useRouter();

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
    clips(
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

const variables = computed(() => ({
  title: route.query.title,
  game: route.query.game,
  broadcaster: route.query.broadcaster,
  startDate: startDateTime.value,
  endDate: endDatetime.value,
  limit: +route.query.limit,
  page: +route.query.page,
  sort: +route.query.sort,
  creator: route.query.creator,
}));

const { result: data, loading } = useQuery(query, variables);

function updateQuery(queryParams) {
  router.replace({
    query: {
      ...route.query,
      ...queryParams,
    },
  });
}

const sortTypes = [
  { title: "Most views", value: 1 },
  { title: "Date added (oldest)", value: 2 },
  { title: "Date added (newest)", value: 3 },
  { title: "Relevance (title)", value: 4 },
];

// const { data } = await useAsyncQuery(query, variables.value);

// const clips = computed({
//   get() {
//     return data.value.clips.clips;
//   },
//   set(value) {
//     data.value.clips.clips = value;
//   },
// });
</script>

<template>
  <q-page padding>
    <div class="q-py-md" style="display: flex">
      <div style="flex-grow: 1">
        <SearchInput />
      </div>

      <div class="q-pl-md">
        <q-btn-group square outline class="full-height">
          <q-btn square outline label="Filter" icon="filter_list" />
          <q-btn-dropdown square outline label="Sort by" icon="sort">
            <q-list separator>
              <q-item
                v-for="(type, idx) in sortTypes"
                :key="idx"
                clickable
                v-close-popup
                @click="updateQuery({ sort: type.value })"
              >
                <q-item-section>
                  <q-item-label>{{ type.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </div>
    </div>

    <div class="row q-col-gutter-md" v-if="!loading">
      <div
        v-for="clip in data.clips.clips"
        :key="clip.id"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <ClipCard
          :title="clip.title"
          :broadcaster-name="clip.broadcaster_name"
          :creator-name="clip.creator_name"
          :view-count="clip.view_count"
          :created-at="clip.created_at"
          :game="clip.game"
          :thumbnail-url="clip.thumbnail_url"
          :url="clip.url"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
