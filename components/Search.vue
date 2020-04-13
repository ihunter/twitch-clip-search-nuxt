<template>
  <v-text-field
    v-model="title"
    flat
    solo
    clearable
    autofocus
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="Search"
    @keydown.enter="search"
  />
</template>

<script>
export default {
  data () {
    return {
      title: this.$route.query.title
    }
  },
  methods: {
    search () {
      const query = { ...this.$route.query, title: this.title }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>
