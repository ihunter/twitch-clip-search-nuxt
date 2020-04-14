<template>
  <div>
    <ClipsLoader v-if="$apollo.loading" />
    <Clips v-else :clips="allClips.clips" />
    <ClipPagination v-if="!$apollo.loading" :count="allClips.count" />
    <ScrollToTopFab />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Clips from '~/components/Clips'
import ClipsLoader from '~/components/ClipsLoader'
import ClipPagination from '~/components/ClipPagination'
import ScrollToTopFab from '~/components/ScrollToTopFab'

export default {
  components: {
    Clips,
    ClipsLoader,
    ClipPagination,
    ScrollToTopFab
  },
  apollo: {
    allClips: {
      query: gql`query allClips(
        $title: String
        $game: String
        $broadcaster: String
        $startDate: String
        $endDate: String
        $limit: Int
        $page: Int
        $sort: Int
      ) {
        allClips(query:{
          title: $title
          game: $game
          broadcaster: $broadcaster
          startDate: $startDate
          endDate: $endDate
          limit: $limit
          page: $page
          sort: $sort
        }) {
          clips {
            title
            broadcaster_name
            creator_name
            view_count
            created_at
            game {
              name
              box_art_url
            }
            thumbnail_url
            url
          },
          count
        }
      }`,
      variables () {
        return {
          title: this.$route.query.title,
          game: this.$route.query.game,
          broadcaster: this.$route.query.broadcaster,
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate,
          limit: +this.$route.query.limit,
          page: +this.$route.query.page,
          sort: +this.$route.query.sort
        }
      }
    }
  }
}
</script>
