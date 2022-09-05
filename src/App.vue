<template>
  <div id="app">
    <AppMain></AppMain>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";

export default {
  name: 'App',
  components: {
    AppMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
