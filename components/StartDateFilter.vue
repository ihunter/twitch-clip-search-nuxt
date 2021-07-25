<template>
  <v-menu
    v-model="startDateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="startDate"
        label="Start Date"
        prepend-inner-icon="mdi-calendar-today"
        clearable
        readonly
        outlined
        filled
        v-on="on"
        @click:clear="updateQuery({ startDate: undefined })"
      />
    </template>
    <v-date-picker
      v-model="startDate"
      :min="oldestDate"
      :max="startDateMax"
      @change="updateQuery({ startDate })"
      @input="startDateMenu = false"
    />
  </v-menu>
</template>

<script>
import moment from "moment";
import queryMixin from "~/mixins/queryMixin";

export default {
  mixins: [queryMixin],
  data() {
    return {
      startDateMenu: false,
      currentDate: moment().format("YYYY-MM-DD"),
      oldestDate: "2016-01-01",
      startDate: this.$route.query.startDate
    };
  },
  computed: {
    startDateMax() {
      return this.endDate ? this.endDate : this.currentDate;
    },
    endDate() {
      return this.$route.query.endDate;
    }
  }
};
</script>
