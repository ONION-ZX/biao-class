  export default {
      uinfo() {
          return JSON.parse(localStorage.getItem('uinfo'));
      },
      logout(url) {
          localStorage.removeItem('uinfo');
          location.href = url || '/';
      },
      login (row) {
        localStorage.setItem('uinfo', JSON.stringify(row));
      },    
      is_admin() {
          let info = this.uinfo();
          return info && this.uinfo().is_admin;
      }
  }
