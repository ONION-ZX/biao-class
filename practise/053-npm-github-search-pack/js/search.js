function user(keyword, on_success, config) {
  /*默认配置*/
  let def = {
    page: 1,
    limit: 5,
    keyword: 'yo',
  },

  /*合并用户配置*/
  config = Object.assign({}, def, config);

  var http = new XMLHttpRequest();
  http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);
  http.send();
  http.onload = function(res) {
    let statusCode = this.status;
    if (statusCode == 200) {
      var data = JSON.parse(this.responseText);
      on_success(data)
    } else {
      console.error('hhh');
    }
  }
  http.onerror = function(res) {
    // 请求错误的时候
  }

  http.ontimeout = function(res) {
    // 请求超时
  }


module.exports = {
  user: user
}

// function user(keyword,on_success) {
//   var http = new XMLHttpRequest();
//   http.open('get','https://api.github.com/search/users?q=' + keyword);
//   http.send();
//
//   http.addEventListener('load',function() {
//     var data = JSON.parse(this.responseText);
//     on_success(data);
//   });
// }
//
// module.exports = {
//   user: user,
// }
