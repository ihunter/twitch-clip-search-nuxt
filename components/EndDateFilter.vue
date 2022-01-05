<template>
  <v-menu
    v-model="endDateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="endDate"
        label="End Date"
        prepend-inner-icon="mdi-calendar"
        clearable
        readonly
        outlined
        v-on="on"
        @click:clear="updateQuery({ endDate: undefined })"
      />
    </template>
    <v-date-picker
      v-model="endDate"
      :max="currentDate"
      :min="endDateMin"
      @change="updateQuery({ endDate })"
      @input="endDateMenu = false"
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
      endDate: this.$route.query.endDate,
      endDateMenu: false,
      currentDate: moment().format("YYYY-MM-DD"),
      oldestDate: "2016-01-01"
    };
  },
  computed: {
    endDateMin() {
      return this.startDate ? this.startDate : this.oldestDate;
    },
    startDate() {
      return this.$route.query.startDate;
    }
  },
  watch: {
    "$route.query.endDate": {
      handler(val) {
        this.endDate = val;
      }
    }
  }
};
</script>
