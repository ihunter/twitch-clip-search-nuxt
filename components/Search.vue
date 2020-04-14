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
    @keydown.enter="updateQuery({ title })"
    @click:clear="updateQuery({ title: undefined })"
  />
</template>

<script>
import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data () {
    return {
      title: this.$route.query.title
    }
  }
}
</script>
