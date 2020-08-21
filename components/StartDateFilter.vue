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
import queryMixin from '~/mixins/queryMixin'

export default {
  mixins: [queryMixin],
  data () {
    return {
      startDateMenu: false,
      currentDate: new Date().toISOString().substr(0, 10),
      oldestDate: new Date('2016-01-01').toISOString().substr(0, 10),
      startDate: this.$route.query.startDate,
      endDate: this.$route.query.endDate
    }
  },
  computed: {
    startDateMax () {
      return this.endDate ? this.endDate : this.currentDate
    }
  }
}
</script>
