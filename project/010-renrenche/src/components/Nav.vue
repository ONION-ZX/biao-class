<template>
  <div :style="{
    marginBottom: this.pushDown ? '20px': '0',
    backgroundColor: this.black ? 'black': 'white',
    }" 
      class="main-nav">
      <div class="col left">
        <router-link to="/" class="logo"><img src="../assets/logo.png"></router-link>
        <a href="#" class="nav-item">Item</a>
        <a href="#" class="nav-item">Item</a>
        <a href="#" class="nav-item">Item</a>
        <a href="#" class="nav-item">Item</a>
      </div>
      <div class="col right">
        <router-link  class="nav-item" to="/login">登录</router-link>
        <router-link  class="nav-item" to="/signup">注册</router-link>
        <a href="#" class="nav-item tel">400-6666-666</a>
        <SearchBar/>
      </div>
    </div>
</template>

<script>
  import SearchBar from './SearchBar.vue';
  export default  {
    components: {SearchBar},
    props: {
      pushDown: {
        default: false,
      },
      black: {
        default: false,
      },
    }
  }
</script>

<style scoped>

  .main-nav {
    padding: 15px;
    background: #fff;
  }

  .logo {
    margin-top: 5px;
    display: inline-block;
    width: 270px;
    height: 48px;
    vertical-align: top;
  }

  .left {
    width: 60%;
  }

  .right {
    width: 40%;
  }

  .nav-item {
    display: inline-block;
    padding: 12px;
  }

  .nav-item {
    color: #555;
    text-decoration: none;
  }

  /* .tel {
    font-weight: bold;
    color: #fd521d;
  } */
</style>
