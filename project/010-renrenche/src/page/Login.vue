<template>
    <div>
        <Nav/>
        <div class="container">
            <div class="login">
                <form class="main_form" autocomplete="off">
                    <div class="error-list" hidden>
                        <div>用户名或密码有误</div>
                    </div>
                    <h2>登录</h2>
                    <div>
                        <label for="用户名">用户名</label>
                        <input v-validator="'required'" id="username" type="text" placeholder="用户名">
                    </div>
                    <div>
                        <label for="密码">密码</label>
                        <input type="password">
                    </div>
                    <button type="submit" class="db">登录</button>
                    <span>没有账号?<a>注册</a></span>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style scoped>
    /* .container {
        background:#efefef;
        width: 1200px;
        height: 400px;
    } */
    h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 500;
        text-align: center;
        padding-bottom: 15px;
    }

    /* .login {
        margin-top: 80px;
        margin-bottom: 50px;
    } */

    label {
        font-size: 15px;
    }

    .main_form {
        position: relative;
        padding: 20px;
        top: 9px; 
        background: #fff;
        margin-right: auto;
        margin-left: auto;
        width: 300px;
        border-radius: 5px;
    }

    .main_form input,
    .main_form button {
        width: 100%;
        height: 30px;
        border:none;
        margin-bottom: 5px;
    }

    .main_form input {
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #c5c1c1;
    }

    .main_form button {
        margin-top: 10px;
        padding: 5px;
        background:rgba(0,0,0,.5);
        color: #fff;
        box-shadow: 0;
        border:0;
    }

    .login span {
        cursor: default;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        padding-left: 0;
        font-size: 12px;
        color: #969292;
    } 

    .login span a {
        cursor: pointer;
        color: grey;
    }
</style>

<script>
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue';
  import validator from '../directive/validator.js';


  export default {
    components : { 
        Nav,
        Footer, 
    },
    directives: {
        validator
    },
  };

</script>
