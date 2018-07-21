<template>
  <div :style="{
    marginBottom: this.pushDown ? '20px': '0',
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
        <div v-if="!uinfo.id">
          <router-link  class="nav-item" to="/login">登录</router-link>
          <router-link  class="nav-item" to="/signup">注册</router-link>
          <div>abc</div>
        <SearchBar/>
        </div>
        <div v-else>
          <span class="nav-item user" to="/login">{{uinfo.username}}</span>
          <span @click="logout" class="nav-item" to="/signup">登出</span>
          <router-link class="nav-item" to="/publish">发布二手车</router-link>
        <SearchBar/>
        </div>
      </div>
    </div>
</template>

<script>
  import SearchBar from './SearchBar.vue';
  import session from '../lib/session';
  export default  {
    components: {SearchBar},
    props: {
      pushDown: {
        default: false,
      },
    },
    data() {
      return {
        uinfo: session.uinfo(),
      };
    },
    methods: {
      logout() {
        session.logout();
      },
    },
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
    text-decoration: none;
    padding: 12px;
    color: #555;
    cursor: pointer;
  }

  .user {
    border-bottom: 2px solid rgba(0,0,0,.7);
    /* border-radius: 30%; */
  }

  /* .tel {
    font-weight: bold;
    color: #fd521d;
  } */
</style>
