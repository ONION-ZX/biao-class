function user(keyword,on_success) {
  var http = new XMLHttpRequest();
  http.open('get','https://api.github.com/search/users?q=' + keyword);
  http.send();

  http.addEventListener('load',function(){
    var data = JSON.parse(this.responseText);
    on_success(data);
  });
}

module.exports = {
  user: user,
}
