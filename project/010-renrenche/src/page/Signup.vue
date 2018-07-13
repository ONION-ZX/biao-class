<template>
    <div>
        <Nav/>
        <div class="container">
            <div class="login">
                <form class="main_form" autocomplete="off">
                    <h2>欢迎注册羊羊车</h2>
                    <div>
                        <label for="用户名">用户名</label>
                        <div class="veri-bar">
                            <input v-validator="'required|min_length:4|max_length:6|username'" 
                               type="text"
                               error-el="#username-error">
                        </div>
                    </div>
                    <div>
                        <label v-validator="'required'" for="密码">密码</label>
                        <div class="veri-bar">
                            <input v-validator="'required|min_length:4|max_length:6'"                   type="password"
                               error-el="#password-error">
                        </div>
                    </div>
                    <div>
                        <label v-validator="'required'" for="密码">重复密码</label>
                        <div class="veri-bar">
                            <input v-validator="'required|min_length:4|max_length:6'"    
                            type="password"
                            error-el="#password-repeat-error">
                        </div>
                    </div>
                    <div>
                        <label for="telephone">手机号码</label>
                        <div class="veri-bar">
                            <input class="veri" v-validator="'required|telephone|numeric'" 
                                   type="text"
                                   error-el="#telephone-error"
                                   >
                                
                            <button class="get" type="button">{{btn_text}}</button>
                        </div>
                    </div>
                    <div>
                        <label for="verification_code">验证码</label>
                        <div class="veri-bar">
                            <input class="veri_code" v-validator="'required|verification_code'" 
                               type="text"
                               error-el="#verification_code-error">
                        </div>
                    </div>
                    <button type="submit" class="db">注册</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
  import validator from '../directive/validator.js';
  export default {
      directives : { validator },
      data(){
          return {
              btn_text: '请输入验证码',
          }
      },
      methods: {
          send_code(phone) {
              api('captcha/sms', { phone })
                .then(r => {
                    this.verify_code = r.result;
                });
          },
      }
    
  }
</script>

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
        background:rgba(0,0,0,.7);
        color: #fff;
        box-shadow: 0;
        border:0;
        margin-top: 10px;
    }

    .veri {
        font-size: 0;
    }

    .veri-bar .veri,
    .veri-bar .get {
        display: inline-block;
        font-size: 13px;
    }  

    .veri-bar .veri {
        width: 70%;
    }

    .veri-bar .get {
        width: 30%;
    }

</style>
