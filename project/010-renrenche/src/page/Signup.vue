<template>
    <div>
        <Nav/>
        <div class="container">
            <div class="login">
                <form class="main_form">
                    <h2>欢迎注册羊羊车</h2>
                    <div class="error">
                        <div>用户名或密码不合法</div>
                    </div>
                    <div>
                        <label for="用户名">用户名</label>
                        <input type="text">
                    </div>
                    <div>
                        <label for="密码">密码</label>
                        <input type="password">
                    </div>
                    <div>
                        <label for="密码">重复密码</label>
                        <input type="password">
                    </div>
                    <button class="db">注册</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style scoped>
    .container {
        /* background:#efefef;
        width: 1200px; */
        height: 435px;
    } 
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
        padding: 25px;
        top: 50px; 
        background: #fff;
        margin-right: auto;
        margin-left: auto;
        width: 400px;
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
        padding: 5px;
        background:#fd521d;
        color: #fff;
        box-shadow: 0;
        border:0;
        margin-top: 10px;
    }

    .error {
        height: 35px;
        font-size: 13px;
        background:#f5a6a6;
        color:brown;
        padding: 10px;
        margin-bottom: 10px;
    }

</style>

<script>
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue'

  export default {
    components : { 
        Nav,
        Footer, 
    },
  };

</script>
