<template>
  <v-card tag="article">
    <v-img class="test" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <div class="clip-info view-count">
        111 views
      </div>
      <div class="clip-info time-ago">
        3 days ago
      </div>
    </v-img>

    <div class="d-flex">
      <div class="mr-2">
        <img
          src="https://static-cdn.jtvnw.net/ttv-boxart/./Viva%20Pi%C3%B1ata:%20Trouble%20in%20Paradise-52x72.jpg"
          class="d-block"
        >
      </div>

      <div>
        <div>Jerma goes insane</div>
        <div>
          <div>Jerma985</div>
          <div>Clipped by lil_skipp3</div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {}
</script>

<style>
.clip-info {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 0.5rem;
  margin: 0.5rem;
  bottom: 0;
}

.view-count {
  left: 0;
}

.time-ago {
  right: 0;
}

.test:hover {
  overflow: visible;
  transform: translate(0.5rem, -0.5rem);
  transition: .1s;
}

.test::before,
.test::after {
  content: '';
  position: absolute;
  background-color: blue;
  width: 0;
  height: 0;
}

.test:hover::before,
.test:hover::after {
  content: '';
  position: absolute;
  background-color: blue;
  transition: 0.1s;
}

.test:hover::before {
  width: 100%;
  height: 0.5rem;
  left: -0.25rem;
  bottom: 0;
  transform: translatey(100%) skewx(-45deg)
}

.test:hover::after {
  width: 0.5rem;
  height: calc(100% + 0.1rem);
  left: 0;
  transform: translatex(-100%) skewy(-45deg);
  top: 0.25rem;
}
</style>
