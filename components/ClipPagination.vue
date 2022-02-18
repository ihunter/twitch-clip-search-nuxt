<template>
  <v-pagination
    v-model="page"
    color="secondary"
    :length="paginationLength"
    total-visible="10"
    class="ma-8"
  />
</template>

<script>
import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    page: {
      get() {
        return +this.$route.query.page || 1;
      },
      set(page) {
        this.updateQuery({ page });
      }
    },
    paginationLength() {
      const limit = this.$route.query.limit || 9;
      return Math.ceil(this.count / limit);
    }
  }
};
</script>
