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

.test {
  overflow: visible;
  transition: 300ms transform;
}

.test:hover {
  transform: translate(5px, -5px);
}

.test::before {
  content: '';
  position: absolute;
  background-color: #9147ff;
  width: 0;
  height: calc(100% + 1px);
  top: 0;
  left: 0;
  transform: skewY(-45deg);
  transition: 300ms width, 300ms top, 300ms left;
}

.test:hover::before {
  width: 5px;
  top: 3px;
  left: -5px;
}

.test::after {
  content: '';
  position: absolute;
  background-color: #9147ff;
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  transition: 300ms height, 300ms bottom, 300ms left;
  transform: skewX(-45deg);
}

 .test:hover::after {
  height: 5px;
  bottom: -5px;
  left: -2px;
}
</style>
