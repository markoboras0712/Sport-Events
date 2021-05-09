<template>
  <div>
    <v-app>
      <AppNavigation />
      <main>
        <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
import AppNavigation from "./components/Navigation/AppNavigation.vue";
export default {
  name: "App",
  components: {
    AppNavigation,
  },
  
};
</script>

<style></style>
