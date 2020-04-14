<template>
  <v-row>
    <v-col
      v-for="loader in 12"
      :key="loader"
      cols="12"
      sm="6"
      md="4"
      lg="4"
    >
      <v-skeleton-loader
        tile
        type="image, list-item-avatar-three-line"
      />
    </v-col>
  </v-row>
</template>
