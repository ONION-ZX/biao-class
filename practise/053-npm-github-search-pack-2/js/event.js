var el = require('./element')
  , search = require('./search')
  , page = 1
  , limit = 5
  , keyword
;

function detect_next_page() {
  el.next.addEventListener('click',function() {
    var config = {
      page: ++page,
      limit: limit,
    }
    search.user(keyword, function(data) {
      el.render_user_list(data.items);
    },config);
  });
}

function detect_submit() {
  el.form.addEventListener('submit',function(e) {
    e.preventDefault();
    keyword = el.input.value;
    search.user(keyword,function(data) {
      el.render_user_list(data.items);
    });
  });
}

function click_to_top() {
  el.top.addEventListener('click',function() {
    window.scrollTo(0,0);
  });
}

function add_events() {
  detect_submit();
  click_to_top();
  detect_next_page();
}

module.exports = {
  detect_next_page: detect_next_page,
  add_events: add_events,
  detect_submit: detect_submit,
  click_to_top: click_to_top,
}
