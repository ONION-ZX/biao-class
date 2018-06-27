<template>
  <div>
    <Me/>
    <!-- <Signup/> -->
    <!-- <Login/> -->
    <!-- <Detail/> -->
    <!--<Home/>-->
  </div>
</template>

<script>

  import Detail from './page/Detail';
  import Home   from './page/Home';
  import Login from './page/Login';
  import Signup from './page/Signup';
  import Me from './page/settings/Me';

  export default {
    name       : 'root',
    components : {
      Detail,
      Home,
      Login,
      Signup,
      Me,
    },
  };
</script>

<style>

</style>
