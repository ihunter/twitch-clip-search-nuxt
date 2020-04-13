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
        prepend-icon="mdi-calendar"
        clearable
        readonly
        v-on="on"
        @click:clear="endDateChanged(undefined)"
      />
    </template>
    <v-date-picker
      v-model="endDate"
      :max="currentDate"
      :min="endDateMin"
      @change="endDateChanged"
      @input="endDateMenu = false"
    />
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      endDateMenu: false,
      currentDate: new Date().toISOString().substr(0, 10),
      oldestDate: new Date('2016-01-01').toISOString().substr(0, 10),
      startDate: this.$route.query.startDate,
      endDate: this.$route.query.endDate
    }
  },
  computed: {
    endDateMin () {
      return this.startDate ? this.startDate : this.oldestDate
    }
  },
  methods: {
    endDateChanged (endDate) {
      const query = { ...this.$route.query, endDate }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>
