<script setup lang="ts">
const { query } = useQueryBuilder()

const { data } = await useFetch('/api/searches', {
  query,
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Searches</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="{ _id, title, userAgent, ip } in data.docs" :key="_id" cols="12" sm="6" md="4" xl="3">
        <v-card>
          <v-card-title>
            {{ title }}
          </v-card-title>

          <v-card-text>
            <p>{{ userAgent }}</p>
            <br>
            <p>{{ ip }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination v-model="query.page" :length="data.totalPages" variant="tonal" color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>
