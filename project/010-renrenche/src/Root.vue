<template>
  <div>
    <!--<Dropdown :onSelect="yo"-->
    <!--displayKey="nickname"-->
    <!--:list="[-->
    <!--{ name : '王花花', value : 1 , nickname: '王那个花花'},-->
    <!--{ name : '李拴蛋', value : 2 , nickname: '李那个拴蛋'},-->
    <!--{ name : '赵可爽', value : 3 , nickname: '赵那个可爽'},-->
    <!--{ name : '刘备备', value : 4 , nickname: '刘那个备备'},-->
    <!--]"/>-->
    <!-- <SearchResult/> -->
    <!-- <Signup/> -->
    <!-- <Login/> -->
    <!-- <Detail/> -->

    <Me/>
    <!-- <Home/> -->
    <!-- <User/> -->
  </div>
</template>

<script>
  // import Detail       from './page/Detail';
  // import Home         from './page/Home';
  // import Login        from './page/Login';
  // import Signup       from './page/Signup';
  // import SearchResult from './page/SearchResult';

  import Me from './page/settings/Me';

  // import User from './page/admin/User';

  // import Dropdown from './components/Dropdown';

  export default {
    name       : 'root',
    components : {
      // Detail,
      // Home,
      // Login,
      // Signup,
      // SearchResult,
      // User,
      Me,
      // Dropdown,
    },
  };
</script>

<style>

</style>
