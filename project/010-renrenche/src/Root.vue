<template>
  <div>
    <router-view></router-view>
    <!-- <Location/> -->
  </div>
</template>

<script>
  import Location from './components/Location';

  export default {
    name       : 'root',
    components : {
      Location,
    },
  }
</script>

<style>

</style>
