<template>
  <!-- <div>
    {{ isLoggedIn }}
  </div> -->
  <v-app>
    <!-- <div v-if="isLoggedIn"> -->
    <div>
      <TopBar />
      <Sidebar />
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { storeToRefs } from 'pinia';
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';

export default {
  components: { Sidebar, TopBar },
};
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
</style>