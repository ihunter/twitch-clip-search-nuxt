import gql from 'graphql-tag'

export const state = () => ({
  clips: [],
  count: 0
})

export const mutations = {
  setClips (state, clips) {
    state.clips = clips.clips
    state.count = clips.count
  }
}

export const actions = {
  async fetchClips ({ commit }) {
    const res = await this.app.apolloProvider.defaultClient.query({
      query: gql`
        query myQuery {
          clips(clipInput: {}) {
            clips {
              url
              broadcaster_id
              broadcaster_name
              creator_id
              creator_name
              video_id
              game_id
              title
              view_count
              created_at
              thumbnail_url
              game {
                box_art_url
              }
            },
            count
          }
        }
      `
    })

    commit('setClips', res.data.clips)
  }
}
