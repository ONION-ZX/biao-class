  export default {
      //获取用户信息
      uinfo() {
          return JSON.parse(localStorage.getItem('uinfo'));
      },
      //登出时将用户信息在ls中移除
      logout(url) {
          localStorage.removeItem('uinfo');
          location.href = url || '/';
      },
      //登录时将用户信息存入ls
      login (row) {
        localStorage.setItem('uinfo', JSON.stringify(row));
      },    
      is_admin() {
          let info = this.uinfo();
          return info && this.uinfo().is_admin;
      },
      //通过id判断用户是否为登录状态
      is_login() {
          return !!this.his_id();
      },
      his_id() {
          let info = this.uinfo();
          return info && this.uinfo().id;
      }
  }
