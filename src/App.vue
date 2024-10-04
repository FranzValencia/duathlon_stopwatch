<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <div id="appMain" class="-bg-green-500">
    <!-- <AppBar /> -->
    <RouterView />
  </div>
</template>
<style>
body {
  background-image: url("background.png");
  background-repeat: repeat;
  background-size: 1280px 720px;
}
</style>
