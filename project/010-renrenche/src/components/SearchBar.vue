<template>
  <form class="search-bar">
    <input placeholder="现代领动" type="search" autofocus>
    <button type="submit">搜</button>
  </form>
</template>

<style scoped>
  .search-bar {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .search-bar input {
    width: 30%;
    outline: 0;
  }

  .search-bar [type="submit"] {
    border-left: 0;
  }
</style>
