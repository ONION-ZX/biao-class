function search() {
  /*准备发射*/
  var http = new XMLHttpRequest();
  http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + current_page + '&per_page=' + limit);
  http.send();

  http.addEventListener('load', function () {
    res = JSON.parse(http.responseText);
    /*拿到搜索结果总数*/
    amount = res.total_count;
    render();
    render_pagination();
  });
  append_history(keyword);
}

function set_keyword() {
  
}

module.exports = {
  search: search,
  set_keyword: set_keyword,
}
