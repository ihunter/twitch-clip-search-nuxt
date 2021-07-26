<template>
  <v-row>
    <v-col cols="6">
      <v-menu
        ref="startTimeMenu"
        v-model="startTimeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startTime"
            label="Start Time"
            prepend-inner-icon="mdi-clock-time-four-outline"
            clearable
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="startTimeMenu"
          v-model="startTime"
          full-width
          @click:minute="$refs.startTimeMenu.save(startTime)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-col cols="6">
      <v-menu
        ref="endTimeMenu"
        v-model="endTimeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endTime"
            label="End Time"
            prepend-inner-icon="mdi-clock-time-seven-outline"
            clearable
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="endTimeMenu"
          v-model="endTime"
          full-width
          @click:minute="$refs.endTimeMenu.save(endTime)"
        ></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      startTimeMenu: false,
      endTimeMenu: false,
      startTime: null,
      endTime: null
    };
  }
};
</script>

<style></style>
