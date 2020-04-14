<template>
  <v-fab-transition>
    <v-btn
      v-show="offsetTop > 200"
      v-scroll="onScroll"
      dark
      fab
      fixed
      bottom
      right
      color="primary"
      @click="$vuetify.goTo(0)"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data () {
    return {
      offsetTop: 0
    }
  },
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset
    }
  }
}
</script>
