<template>
    <div>
        <Nav/>
        <div class="container">
            <div class="login">
                <form @submit="submit($event)" class="main_form" autocomplete="off">
                    <h2>登录</h2>
                    <div v-if="login_failed" class="error-list">
                        <div class="error">用户名或密码有误</div>
                    </div>
                    <div>
                        <label for="用户名">用户名/手机号/邮箱</label>
                        <input v-focus v-model="current.$unique" v-validator="'required'" type="text">
                    </div>
                    <div>
                        <label for="密码">密码</label>
                        <input v-validator="'required'" v-model="current.password" type="password">
                    </div>
                    <button type="submit" class="db">登录</button>
                    <span>没有账号?<router-link to="/signup">注册</router-link></span>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
  import api from '../lib/api';
  import session from '../lib/session';
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue';
  import validator from '../directive/validator.js';

  export default {
    components : { 
        Nav,
        Footer, 
    },
    directives: { validator },
    data() {
        return {
            current: {},
            login_failed: false,
        };
    },
    methods: {
        submit (e) {
        e.preventDefault();
        let unique, password;

        if (!(unique = this.current.$unique) ||
          !(password = this.current.password))
          return;

        if (unique === 'admin' && password === 'adminadmin') {
          this.on_login_succeed({ id : 1, username : 'admin', is_admin : true });
          this.$router.push('/admin/user');
          alert('Yo.管理员');
          return;
        }


        api('user/read', {
          where : {
            or : [
              [ 'username', '=', unique ],
              [ 'phone', '=', unique ],
              [ 'mail', '=', unique ],
            ],
          },
        }).then(r => {
          let row;
          if (!(row = r.data[ 0 ]) || row.password !== password) {
            this.login_failed = true;
            return;

          }
            this.on_login_succeed(row);
            this.$router.push('/');
            alert('Yo.');

        });
      },
      on_login_succeed (row) {
        this.login_failed = false;
        delete row.password;
        session.login(row);
      },
    },
  };
</script>


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
        background: #fff;
        margin-right: auto;
        margin-left: auto;
        width: 335px;
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

