<template>
  <div>
    <ClipsLoader v-if="$apollo.loading" />
    <Clips v-else :clips="allClips.clips" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Clips from '@/components/Clips'
import ClipsLoader from '@/components/ClipsLoader'

export default {
  components: {
    Clips,
    ClipsLoader
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
      ) {
        allClips(query:{
          title: $title
          game: $game
          broadcaster: $broadcaster
          startDate: $startDate
          endDate: $endDate
          limit: $limit
        }) {
          clips {
            title
            broadcaster_name
            creator_name
            view_count
            created_at
            game {
              box_art_url
            }
            thumbnail_url
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
          limit: +this.$route.query.limit
        }
      }
    }
  }
}
</script>
