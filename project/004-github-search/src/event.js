var el = require('./element')
  , history = require('./history')
  , search = require('./search')
  , share = require('./share')
;

function bind_all() {
  detect_submit();
  detect_click_top();
  detect_click_pagination();
  detect_click_input();
  detect_click_document();
  // detect_blur_input();
  //@1 detect_click_history_list();
}


/*绑定表单提交事件*/
function detect_submit() {
  el.form.addEventListener('submit', function (e) {
    e.preventDefault();

    /*获取输入的关键词*/
    var keyword = share.set_keyword(el.input.value);

    if (!keyword) {
      alert('你闹呢');
      return;
    }

    /*重置页码*/
    search.reset_page();

    /*重置用户列表HTML*/
    search.reset_user_list();

    /*隐藏两个只有得到结果才有意义的组件*/
    el.placeholder.hidden = true;

    search.search(keyword);

    search.clear_pagination();
    search.hide_pagination();
  });
}

/*监听点击回到顶部*/
function detect_click_top() {
  el.top.addEventListener('click', function () {
    window.scrollTo(0, 0);
  });
}

function detect_click_pagination() {
  el.pagination_start.addEventListener('click', function () {
    search.goto_page(1);
  });
  el.pagination_end.addEventListener('click', function () {
    search.goto_page(share.get_amount());
  });
}


function detect_click_input() {
  el.input.addEventListener('click', function () {
    history.show_list();
  });
}

function detect_click_document() {
  /*给html元素加点击事件*/
  document
    .documentElement
    .addEventListener('click', function (e) {
      var target = e.target;

      var in_search_input = target.closest('#search-input')
        , in_history_list = target.closest('#history-list')
      ;

      if (in_search_input || in_history_list)
        return;

      history.hide_list();
    });
}

function detect_blur_input() {
  el.input.addEventListener('blur', function () {

  });
}

module.exports = {
  bind_all: bind_all,
}
