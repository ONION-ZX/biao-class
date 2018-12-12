<template>
  <div id="app">
    <A/>
    <B/>
  </div>
</template>

<script>
import A from './A';
import B from './B';
export default {
  name: 'app',
  components: {
    A, B
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
