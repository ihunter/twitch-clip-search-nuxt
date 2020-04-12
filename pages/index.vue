<template>
  <Clips :clips="clipData.clips" />
</template>

<script>
import gql from 'graphql-tag'
import Clips from '@/components/Clips'
export default {
  components: {
    Clips
  },
  asyncData ({ query }) {
    const limit = +query.limit
    return { limit }
  },
  data () {
    return {
      clipData: {
        clips: 12
      }
    }
  },
  apollo: {
    clipData: {
      query: gql`query getClips($limit: Int) {
        clipData(clipInput:{ limit: $limit }) {
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
          limit: this.limit
        }
      }
    }
  }
}
</script>
