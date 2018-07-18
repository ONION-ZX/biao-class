<template>
  <div :style="{width: width}" class="card side-nav">
    <router-link class="nav-item" to="/admin/user">用户管理</router-link>
    <router-link class="nav-item" to="/admin/order">预约管理</router-link>
    <router-link class="nav-item" to="/admin/vehicle">车辆管理</router-link>
    <router-link class="nav-item" to="/admin/report">质检管理</router-link>
    <router-link class="nav-item" to="/admin/brand">品牌管理</router-link>
    <router-link class="nav-item" to="/admin/model">车系管理</router-link>
    <router-link class="nav-item" to="/admin/design">设计管理</router-link>


  </div>
</template>

<script>
  import '../css/sidenav.css';
  export default {
    props : [ 'width' ],
  };
</script>

<style scoped></style>
