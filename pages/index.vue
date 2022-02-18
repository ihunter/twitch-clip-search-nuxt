<template>
  <div>
    <ClipsLoader v-if="$apollo.loading" />
    <Clips v-else :clips="allClips.clips" />
    <ClipPagination v-if="!$apollo.loading" :count="allClips.count" />
    <ScrollToTopFab />
    <a href="https://ko-fi.com/U7U2AMIW3" target="_blank" style="display: block; text-align:center; margin-top: 3rem;"
      ><img
        height="36"
        style="border: 0px; height: 36px;"
        src="https://cdn.ko-fi.com/cdn/kofi1.png?v=3"
        border="0"
        alt="Buy Me a Coffee at ko-fi.com"
    /></a>
  </div>
</template>

<script>
import moment from "moment";
import gql from "graphql-tag";
import Clips from "~/components/Clips";
import ClipsLoader from "~/components/ClipsLoader";
import ClipPagination from "~/components/ClipPagination";
import ScrollToTopFab from "~/components/ScrollToTopFab";

export default {
  layout: "search",
  components: {
    Clips,
    ClipsLoader,
    ClipPagination,
    ScrollToTopFab,
  },
  computed: {
    startDatetime() {
      const startTime = this.$route.query.startTime;
      const startDate = this.$route.query.startDate;

      if (startTime && startDate) {
        return moment(`${startDate} ${startTime}`, "YYYY-M-D HH:mm");
      }

      return moment(this.$route.query.startDate, "YYYY-M-D").startOf("day");
    },
    endDatetime() {
      const endTime = this.$route.query.endTime;
      const endDate = this.$route.query.endDate;

      if (endTime && endDate) {
        return moment(`${endDate} ${endTime}`, "YYYY-M-D HH:mm");
      }

      return moment(this.$route.query.endDate, "YYYY-M-D").endOf("day");
    },
  },
  beforeUpdate() {
    window.scrollTo(0, 0);
  },
  apollo: {
    allClips: {
      query: gql`
        query allClips(
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
          allClips(
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
      `,
      variables() {
        return {
          title: this.$route.query.title,
          game: this.$route.query.game,
          broadcaster: this.$route.query.broadcaster,
          startDate: this.startDatetime,
          endDate: this.endDatetime,
          limit: +this.$route.query.limit,
          page: +this.$route.query.page,
          sort: +this.$route.query.sort,
          creator: this.$route.query.creator,
        };
      },
    },
  },
};
</script>
