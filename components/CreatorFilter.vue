<template>
  <v-text-field
    v-model="creator"
    label="Creator Name"
    prepend-inner-icon="mdi-account"
    autocomplete="off"
    clearable
    outlined
    @change="updateQuery({ creator })"
    @click:clear="updateQuery({ creator: undefined })"
  />
</template>

<script>
import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  data() {
    return {
      creator: this.$route.query.creator
    };
  }
};
</script>
