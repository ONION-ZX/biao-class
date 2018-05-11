var ele = require('./element')
  , search = require('./search')
  , history = require('./history')
  , share = require('./share')
;

function bind_all() {
  detect_submit();
  detect_click_top();
  detect_click_input();
  detect_click_document();
  detect_click_pagination();
}

function detect_submit() {
  ele.form.addEventListener('submit',function(e) {
    e.preventDefault();

    var keyword = share.set_keyword(ele.input.value);
    if(!keyword) {
      alert('please input some keyword...');
      return;
    }
    search.reset_page();
    search.reset_user_list();

    ele.placeholder.hidden = true;
    search.search(keyword);

    search.clear_pagination();
    search.hide_pagination();
  })
}

function detect_click_top() {
  ele.top.addEventListener('click',function() {
    window.scrollTo(0,0);
  });
}

//首页末页
function detect_click_pagination() {
  ele.pagination_start.addEventListener('click',function() {
    search.go_to_page(1);
  });
  ele.pagination_end.addEventListener('click',function() {
    search.go_to_page(share.get_amount());
  })
}

function detect_click_input() {
  ele.input.addEventListener('click',function() {
    history.show_list();
  });
}

function detect_click_document() {
  document.documentElement.addEventListener('click',function(e) {
    var target = e.target;

    var in_search_input = target.closest('#search-input')
      , in_history_list = target.closest('#history-list')
    ;

    if(in_search_input || in_history_list)
      return;

    history.hide_list();
  });
}

module.exports = {
  bind_all: bind_all,
}
