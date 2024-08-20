<script setup lang="ts">
import type { GameResponse } from '~/types'

const showFilterDialog = ref(false)
const { smAndDown } = useDisplay()

const search = ref('')
const game = useRouteQuery('game', '')

const { data: games, status } = await useFetch<GameResponse[]>(`/api/games`, {
  query: {
    search,
  },
  lazy: true,
})

console.log(game.value)
console.log(search.value)

function test(e) {
  search.value = e
}
</script>

<template>
  <v-btn icon="mdi-filter-variant" @click="showFilterDialog = true" />

  <ClientOnly>
    <Teleport to="#teleports">
      <v-dialog v-model="showFilterDialog" :fullscreen="smAndDown" max-width="800">
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="game"
                    label="Game(s)"
                    :search="search"
                    :items="games"
                    item-title="name"
                    item-value="id"
                    multiple
                    prepend-inner-icon="mdi-controller-classic"
                    @update:search="test"
                  />
                </v-col>
                <v-col>
                  <v-text-field />
                </v-col>
                <v-col>
                  <v-text-field />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>

</style>
