<template>
  <v-menu v-model="filterMenu" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon :ripple="{ center: true }" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <!-- <v-autocomplete
          v-model="broadcaster"
          label="Broadcaster"
          clearable
          :items="broadcasters"
          item-text="display_name"
          item-value="id"
          :loading="loading.broadcasters"
          :disabled="loading.broadcasters"
          @change="broadcasterChanged"
        /> -->

        <!-- <v-autocomplete
          v-model="game"
          label="Game"
          clearable
          :items="games"
          item-text="name"
          item-value="id"
          :loading="loading.games"
          :disabled="loading.games"
        /> -->
        <v-autocomplete
          v-model="game"
          label="Game"
          clearable
          :items="allGames"
          item-text="name"
          item-value="id"
          @change="gameChanged"
          @click:clear="gameChanged(null)"
        />

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
              prepend-icon="mdi-calendar-today"
              clearable
              readonly
              v-on="on"
              @click:clear="startDateChanged(null)"
            />
          </template>
          <v-date-picker
            v-model="startDate"
            :min="oldestDate"
            :max="startDateMax"
            @change="startDateChanged"
            @input="startDateMenu = false"
          />
        </v-menu>

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
              @click:clear="endDateChanged(null)"
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
      </v-card-text>

      <!-- <v-divider />

      <v-card-actions>
        <v-btn color="primary" text @click="clearFilter">
          clear
        </v-btn>
        <v-spacer />
        <v-btn color="primary" text @click="filter">
          apply
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-menu>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data () {
    return {
      filterMenu: false,
      startDateMenu: false,
      endDateMenu: false,
      currentDate: new Date().toISOString().substr(0, 10),
      oldestDate: new Date('2016-01-01').toISOString().substr(0, 10),
      broadcaster: this.$route.query.broadcaster,
      game: this.$route.query.game,
      startDate: this.$route.query.startDate,
      endDate: this.$route.query.endDate
    }
  },
  apollo: {
    allGames: {
      query: gql`query allGames($broadcaster: String) {
        allGames (broadcasterID: $broadcaster) {
          id
          name
        }
      }`,
      variables () {
        return {
          broadcaster: this.broadcaster
        }
      }
    }
  },
  computed: {
    startDateMax () {
      return this.endDate ? this.endDate : new Date().toISOString().substr(0, 10)
    },
    endDateMin () {
      return this.startDate ? this.startDate : this.oldestDate
    }
  },
  methods: {
    gameChanged () {
      const query = { ...this.$route.query, game: this.game }
      this.$router.push({ path: '/', query })
    },
    startDateChanged (date) {
      const query = { ...this.$route.query, startDate: date }
      this.$router.push({ path: '/', query })
    },
    endDateChanged (date) {
      const query = { ...this.$route.query, endDate: date }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>

<style>
</style>
