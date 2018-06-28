<template>
  <div :style="{width: width}" class="card side-nav">
    <a href="#" class="nav-item active">用户管理</a>
    <a href="#" class="nav-item">车辆管理</a>
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
