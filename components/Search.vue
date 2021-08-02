<template>
  <v-text-field
    v-model="title"
    flat
    solo
    clearable
    autofocus
    autocomplete="off"
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="Search"
    @keydown.enter="updateQuery({ title })"
    @click:clear="updateQuery({ title: undefined })"
  >
    <template v-slot:append>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">
            mdi-help-circle-outline
          </v-icon>
        </template>
        Search for exact phrases by wrapping them in double-quotes
        <br />
        To exclude a word prepend with a hyphen
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  data() {
    return {
      title: this.$route.query.title
    };
  }
};
</script>
