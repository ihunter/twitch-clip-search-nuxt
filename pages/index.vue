<script setup>
const dayjs = useDayjs();
const route = useRoute();
const { updateQuery } = useRouteQuery();

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
  limit: +route.query.limit || 9,
  page: +route.query.page || 1,
  sort: +route.query.sort,
  creator: route.query.creator,
}));

const { result: data, loading } = useQuery(query, variables);

const sortTypes = [
  { title: "Most views", value: 1 },
  { title: "Date added (oldest)", value: 2 },
  { title: "Date added (newest)", value: 3 },
  { title: "Relevance (title)", value: 4 },
];

const page = computed({
  get() {
    return +route.query.page || 1;
  },
  set(pageNumber) {
    updateQuery({ page: pageNumber });
  },
});

const openFilterDialog = ref(false);
</script>

<template>
  <q-page padding class="container">
    <div class="q-py-md" style="display: flex">
      <div style="flex-grow: 1">
        <SearchInput />
      </div>

      <div class="q-pl-md">
        <q-btn-group square outline class="full-height">
          <q-btn
            square
            outline
            label="Filter"
            icon="filter_list"
            @click="openFilterDialog = true"
          />
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

    <div class="q-py-md flex flex-center" v-if="!loading">
      <q-pagination
        v-model="page"
        :max="data.clips.count"
        :max-pages="10"
        direction-links
      />
    </div>

    <FilterDialog v-model="openFilterDialog" />
  </q-page>
</template>

<style lang="scss" scoped>
$xs-breakpoint: 718px;
$sm-breakpoint: 1024px;
$md-breakpoint: 1439px;
$lg-breakpoint: 1920px;

.container,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

// @media (min-width: $xs-breakpoint) {
//   .container,
//   .container-sm {
//     max-width: 540px;
//   }
// }

// @media (min-width: $sm-breakpoint) {
//   .container,
//   .container-sm,
//   .container-md {
//     max-width: 920px;
//   }
// }

@media (min-width: $md-breakpoint) {
  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: 1140px;
  }
}

@media (min-width: $lg-breakpoint) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1440px;
  }
}
</style>
