<template>
  <div :style="{width: width}" class="card side-nav">
    <a href="#" class="nav-item">基础信息</a>
    <a href="#" class="nav-item">安全设置</a>
    <a href="#" class="nav-item">买卖设置</a>
  </div>
</template>

<script>
  import '../css/admin.css'
  export default {
    props : [ 'width' ],
  };
</script>

<style scoped>
  .side-nav {
    background: #fff;
  }

  .nav-item {
    color: #555;
    display: block;
    padding: 10px 20px;
  }

  .nav-item:hover {
    background: rgba(0, 0, 0, .02);
  }
</style>
