  export default {
      uinfo() {
          return JSON.parse(localStorage.getItem('uinfo'));
      },
      logout(url) {
          localStorage.removeItem('uinfo');
          location.href = url || '/';
      }
  }
