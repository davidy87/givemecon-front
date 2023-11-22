<template>
  <navbar-header></navbar-header>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import NavbarHeader from './components/NavbarHeader.vue';

export default {
  name: 'App',
  components: {
    NavbarHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
