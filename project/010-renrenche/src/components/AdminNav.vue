<template>
  <div :style="{width: width}" class="card side-nav">
    <router-link class="nav-item" to="/admin/user">用户管理</router-link>
    <router-link class="nav-item" to="/admin/vehicle">车辆管理</router-link>
    <a href="#" class="nav-item">车辆品牌</a>
    <a href="#" class="nav-item">质检管理</a>
  </div>
</template>

<script>
  import '../css/sidenav.css';
  export default {
    props : [ 'width' ],
  };
</script>

<style scoped></style>
