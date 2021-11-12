<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../src/components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>
<style>
#app {
  font-family: "Mitr", sans-serif;
  font-family: "Prompt", sans-serif;
}
</style>
