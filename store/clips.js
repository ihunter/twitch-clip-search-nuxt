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
    try {
      const clips = await this.$axios.get('http://localhost:3000/api/v1/clips')

      commit('setClips', clips.data)
    } catch (error) {
      console.log(error)
    }
  }
}
