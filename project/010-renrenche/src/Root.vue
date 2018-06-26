<template>
  <div>
    <Detail/>
    <!--<Home/>-->
  </div>
</template>

<script>

  import Detail from './page/Detail';
  import Home   from './page/Home';

  export default {
    name       : 'root',
    components : {
      Detail,
      Home,
    },
  };
</script>

<style>

</style>
