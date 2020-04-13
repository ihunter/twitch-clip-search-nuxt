<template>
  <v-row>
    <v-col
      v-for="loader in 12"
      :key="loader"
      cols="4"
    >
      <v-skeleton-loader
        type="card"
      />
    </v-col>
  </v-row>
</template>
