<template>
  <div>
    <h1>Searches</h1>
    <v-row>
      <v-col v-for="search in allSearches.searches" :key="search.id" cols="12">
        <UserSearch :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import UserSearch from "@/components/UserSearch";

export default {
  components: {
    UserSearch
  },
  apollo: {
    allSearches: {
      query: gql`
        {
          allSearches(query: {}) {
            searches {
              title
              creator_name
              createdAt
              broadcaster_id
              createdAt
              startDate
              endDate
              games {
                name
                box_art_url
              }
            }
            count
          }
        }
      `
    }
  }
};
</script>

<style></style>
