export default {
  methods: {
    updateQuery(queryParams) {
      console.log("queryParams", queryParams);
      const query = { ...this.$route.query, page: 1, ...queryParams };
      this.$router.push({ path: "/", query });
    }
  }
};
