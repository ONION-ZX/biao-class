;(function() {
  'use strict';

  window.search = {
    search_repo: search_repo,
    search_user: search_user,
  }

  function search_user(keyword) {
    send.get('https://api.github.com/search/users?q=' + keyword,
        function(data) {
          console.log(data);
        });
  }

  function search_repo(keyword) {
    send.get('https://api.github.com/search/users?q=' + keyword,
        function(data) {
          console.log(data);
        });
  }
})();

// ;(function () {
//   'use strict';
//
//   window.search = {
//     search_user: search_user,
//     search_repo: search_repo,
//   };
//
//   function search_user(kwd) {
//     send.get('https://api.github.com/search/users?q=' + kwd,
//       function (data) {
//         console.log(data);
//       });
//   }
//
//   function search_repo(kwd) {
//     send.get('https://api.github.com/search/repositories?q=' + kwd,
//       function (data) {
//         console.log(data);
//       });
//   }
//
// })();
