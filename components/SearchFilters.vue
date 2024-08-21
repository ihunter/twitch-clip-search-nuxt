<script setup lang="ts">
const showFilterDialog = ref(false)
const { smAndDown } = useDisplay()
</script>

<template>
  <v-btn icon="mdi-filter-variant" @click="showFilterDialog = true" />

  <v-dialog v-model="showFilterDialog" :fullscreen="smAndDown" max-width="800">
    <v-card>
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <GameFilter />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
