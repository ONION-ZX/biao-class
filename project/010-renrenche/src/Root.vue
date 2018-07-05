<template>
  <div>
    <!-- <Dropdown :onSelect="yo"
    displayKey="nickname"
    :list="[
    { name : '王花花', value : 1 , nickname: '王那个花花'},
    { name : '李拴蛋', value : 2 , nickname: '李那个拴蛋'},
    { name : '赵可爽', value : 3 , nickname: '赵那个可爽'},
    { name : '刘备备', value : 4 , nickname: '刘那个备备'},
    ]"/>  -->
    <!-- <router-view></router-view> -->
    <Location/>
  </div>
</template>

<script>
  import Vehicle from './page/admin/Vehicle';
  import Base from './page/admin/Base';
  import Brand from './page/admin/Brand';
  import User from './page/admin/User';
  import Model from './page/admin/Model';

  import Detail       from './page/Detail';
  import Home         from './page/Home';
  import Login        from './page/Login';
  import Signup       from './page/Signup';
  import SearchResult from './page/SearchResult';
  import Me from './page/settings/Me';
  import Dropdown from './components/Dropdown';
  import Location from './components/Location';

  export default {
    name       : 'root',
    components : {
      Model,
      Base,
      Brand,
      Vehicle,
      Detail,
      Home,
      Login,
      Signup,
      SearchResult,
      User,
      Me,
      Dropdown,
      Location,
    },
  };
</script>

<style>

</style>
