var el = require('./element')
  , share = require('./share')
  , no_more
  , page_amount
  , max_page_btn = 5
  , res
  , MAX_LIMIT = 999
;


function goto_page(page) {

  var max_user_limit_reached = share.get_current_page() * share.get_limit() > MAX_LIMIT;

  if (max_user_limit_reached) {
    current_page = share.set_current_page(Math.floor(MAX_LIMIT / limit));
  } else {
    current_page = share.set_current_page(page);
  }

  search();
}


/*重置页码为1*/
function reset_page() {
  share.set_current_page(1);
}

/*清空已渲染内容*/
function reset_user_list() {
  el.user_list.innerHTML = '';
}


/**
 * 通过数据生成HTML
 */
function render() {
  /*初始化HTML*/
  var html = '';

  /*遍历用户列表*/
  res.items.forEach(function (user) {
    /*每个用户都追加到HTML后面*/
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

  /*将生成的HTML写入模板床*/
  el.user_list.innerHTML = html;
  document
    .getElementById('amount')
    .innerHTML = `共有${res.total_count}条结果`;

  /*如果每页的数量乘以页数大于总数就说明当前页就是最后一页*/
  no_more = share.get_current_page() * share.get_limit() >= share.get_amount();

  /*
  .hidden = no_more;
  el.placeholer.hidden = !no_more;
  */

  /*如果没有更多*/
  if (no_more) {
    /*隐藏翻页按钮*/
    /*显示"谋了"*/
    el.placeholder.hidden = false;
  } else { // 否则正好相反
    el.placeholder.hidden = true;
  }
}

function clear_pagination() {
  el.pagination.innerHTML = '';
}

function hide_pagination() {
  el.pagination_container.hidden = true;
}

function show_pagination() {
  el.pagination_container.hidden = false;
}

function render_pagination() {
  show_pagination();
  clear_pagination()
  get_page_amount();

  var start
    , end
    , middle = Math.ceil(max_page_btn / 2)
    , current_page = share.get_current_page()
    , reaching_left = current_page <= middle
    , reaching_right = current_page >= page_amount - middle;
  ;


  if (reaching_left) {
    /*
    当前页在左边
    [...].....
    */
    /*设按钮开始为1*/
    start = 1;

    /*设结束为可视按钮最大值*/
    end = max_page_btn;
  } else if (reaching_right) {
    /*
    当前页在右边
    .....[...]
    */
    /*设按钮开始为总页数减去可视按钮最大值*/
    start = page_amount - max_page_btn;
    /*设按钮结束为总页数*/
    end = page_amount;
  } else {
    /*
    当前页在中间
    ...[...]...
    */

    /*加1或减1是为了排除中间按钮*/

    /*设按钮开始为当前页减去可视按钮最大值的一半*/
    start = current_page - middle + 1;
    /*设按钮结束为当前页加上可视按钮最大值的一半*/
    end = current_page + middle - 1;
  }

  /*如果出于任何诡异的原因导致开始按钮小于1就将其复位为1*/
  if (start < 1) {
    start = 1;
  }

  /*如果出于任何诡异的原因导致结束按钮大于页面总数就将其复位为总数*/
  if (end > page_amount) {
    end = page_amount;
  }

  /*通过指定开始和结束动态的追加翻页按钮*/
  for (var i = start; i <= end; i++) {
    var num = i;

    /*生成btn按钮*/
    var btn = document.createElement('button');
    /*指定它是第几页的按钮*/
    btn.innerText = num;

    /*给所有页码加pager类，方便以后指定样式*/
    btn.classList.add('pager');

    /*如果当前页等于正在迭代的按钮，就给按钮加一个激活的类，
    不然用户不知道自己当前在第几页*/
    if (current_page == num) {
      btn.classList.add('active');
    }

    /*追加到页码容器的后面*/
    el.pagination.appendChild(btn);

    btn.addEventListener('click', make_function_on_page_change(num));
  }
}


function set_keyword(kwd) {
  el.input.value = kwd;
  share.set_keyword(kwd);
}

function make_function_on_page_change(num) {
  return function (e) {
    /*让current_page（当前页面）等于点击的按钮的序号*/
    current_page = share.set_current_page(num);
    /*然后再搜索，不然的话永远都在取第1页的数据*/
    search();
  };
}


/*获取页面总数*/
function get_page_amount() {
  /*总人数除以每页的数量*/
  page_amount = Math.ceil(share.get_amount() / share.get_limit());
}

/*通过用户名搜Github用户
 * @param String keyword 关键词
 * */
function search() {

  /*准备发射*/
  var http = new XMLHttpRequest();
  http.open('get',
    'https://api.github.com/search/users?q=' +
    share.get_keyword() +
    '&page=' +
    share.get_current_page() +
    '&per_page=' +
    share.get_limit());

  var history = require('./history');

  history.append(share.get_keyword());

  /*发射*/
  http.send();

  /*返回后*/
  http.addEventListener('load', function () {
    /*解析（将JSON格式的字符串转换为JS能理解的数据）返回数据*/
    res = JSON.parse(this.responseText);

    /*拿到搜索结果总数*/
    share.set_amount(res.total_count);
    /*既然有了数据，不就可以渲染用户列表和页码组件了吗？*/
    render();
    render_pagination();
  });
}

module.exports = {
  goto_page: goto_page,
  search: search,
  reset_page: reset_page,
  reset_user_list: reset_user_list,
  clear_pagination: clear_pagination,
  hide_pagination: hide_pagination,
  set_keyword: set_keyword,
}
