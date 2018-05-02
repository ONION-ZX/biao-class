;(function() {
  'use strict';

  window.send = {
    get: get,
    post: post,
    send: send,
  }

  function get(url, on_succeed) {
    send(url,'get',on_succeed);
  }

  function post(url, on_succeed) {
    send(url,'post',on_succeed);
  }

  function send(url,method,on_succeed) {
    var http = new XMLHttpRequest();
    http.open(method,url);
    http.send();

    http.addEventListener('load',function() {
      on_succeed(this.responseText);
    });
  }

})();

// ;(function () {
//   'use strict';
//
//   window.send = {
//     get: get,
//     post: post,
//     send: send,
//   };
//
//   function get(url, on_succeed) {
//     send(url, 'get', on_succeed);
//   }
//
//   function post(url, on_succeed) {
//     send(url, 'post', on_succeed);
//   }
//
//   function send(url, method, on_succeed) {
//     var http = new XMLHttpRequest();
//     http.open(method, url);
//     http.send();
//
//     http.addEventListener('load', function () {
//       on_succeed(this.responseText);
//     });
//   }
//
// })();
