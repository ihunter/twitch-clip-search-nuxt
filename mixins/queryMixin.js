export default {
  methods: {
    updateQuery (queryParams) {
      const query = { ...this.$route.query, page: 1, ...queryParams }
      this.$router.push({ path: '/', query })
    }
  }
}
