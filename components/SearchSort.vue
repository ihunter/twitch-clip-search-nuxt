<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        :ripple="{ center: true }"
        v-on="on"
      >
        <v-icon>mdi-sort-variant</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(type, i) in sortTypes"
        :key="i"
        @click="updateQuery({ sort: type })"
      >
        <v-list-item-title>{{ type.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data: () => ({
    sortTypes: [
      { title: 'Most views', value: 1 },
      { title: 'Date added (oldest)', value: 2 },
      { title: 'Date added (newest)', value: 3 },
      { title: 'Relevance (title)', value: 4 }
    ]
  })
}
</script>

<style>

</style>
