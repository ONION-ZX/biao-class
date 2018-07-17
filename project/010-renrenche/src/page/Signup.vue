<template>
    <div>
        <Nav/>
        <div class="container">
            <div class="login">
                <form @submit="submit" class="main_form" autocomplete="off">
                    <h2>欢迎注册羊羊车</h2>
                    <div class="row tac tab-title">
                        <div @click="signup_by = 'phone'" :class="'col-lg-6 ' + (signup_by == 'phone' ? 'active' : '')">手机注册</div>
                        <div @click="signup_by = 'mail'" :class="'col-lg-6 ' + (signup_by == 'mail' ? 'active' : '')">邮箱注册</div>
                    </div>
                    <div>
                        <label for="用户名">用户名</label>
                        <div class="veri-bar">
                            <input v-validator="'required|min_length:4|max_length:18|username'"
                                   v-model="current.username"  
                                   type="text"
                                   error-el="#username-error">
                        </div>
                    </div>
                    <div>
                        <label  for="密码">密码</label>
                        <div class="veri-bar">
                            <input id="password"
                                   v-model="current.password" 
                                   v-validator="'required|min_length:6|max_length:64'" 
                                   type="password"
                                   error-el="#password-repeat-error">
                        </div>
                    </div>
                    <div>
                        <label  for="密码">重复密码</label>
                        <div class="veri-bar">
                            <input v-model="current.password2" 
                                   v-validator="'required|shadow:#password'" 
                                   type="password"
                                   id="password2">
                        </div>
                    </div>
                    <div :key="'phone'" v-if="signup_by == 'phone'">
                        <label for="telephone">手机号码</label>
                        <div class="veri-bar">
                            <input v-model="current.phone" class="veri"
                                   type="text"
                                   error-el="#telephone-error"
                                   v-validator="'required|telephone|not_exist:user,phone'"
                                   >
                            <button :disabled="cap.countdown!=0" class="get" type="button" @click="send_code">
                                <span v-if="cap.countdown">{{cap.countdown}}</span>
                                <span v-else>{{btn_text}}</span>
                            </button>
                        </div>
                    </div>
                    <div :key="'mail'" v-if="signup_by == 'mail'">
                        <label for="mail">邮箱</label>
                        <div class="veri-bar">
                            <input v-validator="'required|mail|not_exist:user,mail'"
                                   v-model="current.mail" class="veri"
                                   type="text">
                            <button :disabled="cap.countdown!=0" class="get" type="button" @click="send_code">
                                <span v-if="cap.countdown">{{cap.countdown}}</span>
                                <span v-else>{{btn_text}}</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label for="verification_code">验证码</label>
                        <div class="veri-bar">
                            <input v-model="current.user_code" class="veri_code"
                               type="text">
                        </div>
                        <div v-if="invalid_code" class="error-list">
                            <div class="error">验证码有误</div>
                        </div>
                     </div>
                    <button type="submit" class="db" disabled="false">注册</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
  import Nav from '../components/Nav';
  import Footer from '../components/Footer';
  import validator from '../directive/validator.js';
  import api from '../lib/api';

  export default {
      components: {Nav, Footer},
      directives : { validator },
      data(){
          return {
              current: {},
              cap: {
                  timer: null,
                  countdown: 0,
              },
              signup_by: 'phone',
              btn_text: '获取验证码',
              verify_code: '',
              verify_str: '',
              invalid_code: false,

          }
      },
      methods: {
          submit (e) {          
            e.preventDefault();
            this.invalid_code = this.current.user_code !== this.code;
            
            if (this.invalid_code)
            return;

            if (this.signup_by == 'mail')
            delete this.current.phone;
            else
            delete this.current.mail;

            // 如果没有用户名，就默认用已填的邮箱或手机号作为用户名
            !this.current.username && (this.current.username = this.current[ this.signup_by ]);
            api('user/create', this.current)
            .then(r => {
                this.invalid_code = false;
                alert('注册成功!');
                this.$router.push('/');
            });
      },
        send_code () {
            //倒计时进行中不发送验证码
            if (this.cap.countdown)
                return;
            let action
               ,by_mail;

            this.cap.countdown = 60; //设置倒计时60s
            action = 'sms'; //默认通过手机号码注册

            if(by_mail = this.signup_by == 'mail')
                action = 'mail';
            if ((by_mail && !this.current.mail) || (!by_mail && !this.current.phone))
                return;

            this.cap.timer = setInterval(() => {
                if (this.cap.countdown == 0) {
                    clearInterval(this.cap.timer);
                    return;
                }
                this.$set(this.cap, 'countdown', this.cap.countdown - 1);
            }, 1000);

            api(`captcha/${action}`, { phone : this.current.phone, mail: this.current.mail })
                .then(r => {
                this.code = atob(r.data.result);
                });
        },
      },
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

    .active {
        border-bottom: 2px solid rgba(0,0,0,.3);
    }

    label {
        font-size: 15px;
    }

    button[disabled] {
        background: rgba(0,0,0,.4) !important;
        opacity: .6;
    }

    .main_form {
        /* position: relative; */
        /* top: 50px;  */
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

    .tab-title {
        margin-bottom: 10px;
    }

    .tab-title div {
        padding: 5px;
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
