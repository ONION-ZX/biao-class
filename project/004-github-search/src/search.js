var ele = require('./element')
  , share = require('./share')
  , keyword = share.get_keyword()
  , limit = share.get_limit()
  , no_more
  , res
;

function search() {
  /*准备发射*/
  var http = new XMLHttpRequest();
  http.open('get', 'https://api.github.com/search/users?q=' + share.get_keyword() + '&page=' + share.get_current_page() + '&per_page=' + share.get_limit());

  //有重复 删除再写入 无重复 直接写入
  var history = require('./history');
  history.append(share.get_keyword());

  http.send();

  http.addEventListener('load', function () {
    res = JSON.parse(http.responseText);
    /*拿到搜索结果总数*/
    share.set_amount(res.total_count);
    render();
    render_pagination();
  });
}

function render() {
  var html = '';
  res.items.forEach(function(user) {
    html = html + `
      <div class="user">
        <a class="avatar" target="_blank" href="${user.html_url}">
          <img src="${user.avatar_url}">
        </a>
        <div class="info">
          <div class="username">${user.login}</div>
          <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
        </div>
      </div>
    `;
  });
  ele.user_list.innerHTML = html;
  document.getElementById('amount').innerHTML = `共有${res.total_count}条结果`;

  no_more = share.get_current_page() * share.get_limit() >= share.get_amount();

  if(no_more)
    ele.placeholer.hidden = false;
  ele.placeholer.hidden = true;
}

function set_keyword(kwd) {
  ele.input.value = kwd;
  keyword = kwd;
}

function reset_page() {
  share.set_current_page(1);
}

function reset_user_list() {
  ele.user_list.innerHTML = '';
}

function get_page_amount() {
  page_amount = Math.ceil(share.get_amount() / share.get_limit());
}

function go_to_page(page) {
  var reach_page_limit = page * limit > MAX_LIMIT;

  if(reach_page_limit) {
    current_page = share.set_current_page(Math.floor(MAX_LIMIT / limit));
  } else {
    current_page = share.set_current_page(page);
  }

  search();
}

function show_pagination() {
  ele.pagination_container.hidden = false;
}

function hide_pagination() {
  ele.pagination_container.hidden = true;
}

function render_pagination() {
  show_pagination();
  clear_pagination();
  get_page_amount();

  var start
    , end
    , max_page_btn
    , middle = Math.ceil(max_page_btn / 2)
    , page_amount = share.get_page_amount()
    , current_page = share.get_current_page()
    , reaching_left = current_page <= middle
    , reaching_left = current_page >= page_amount - middle
  ;

  if(reaching_left) {
    start = 1;
    end = max_page_btn;
  } else if (reaching_right) {
    start = page_amount - max_page_btn;
    end = page_amount
  } else {
    start = current_page - middle + 1;
    end = current_page + middle - 1;
  }

  if(start < 1) {
    start = 1;
  }

  if(end > page_amount) {
    end = page_amount;
  }

  for(var i = start; i <= end; i++) {
    var num = i;
    var btn = document.createElement('button');
    btn.innerText = num;
    btn.classList.add('pager');

    if(current_page == num) {
      btn.classList.add('active');
    }

    ele.pagination.appendChild(btn);
    btn.addEventListener('click',make(num));
  }

  function make(num) {
    return function() {
      current_page = share.set_current_page(num);
      search();
    }
  }
}

function clear_pagination() {
  ele.pagination.innerHTML = '';
}

module.exports = {
  search: search,
  set_keyword: set_keyword,
  reset_page: reset_page,
  reset_user_list: reset_user_list,
  clear_pagination: clear_pagination,
  hide_pagination: hide_pagination,
}
