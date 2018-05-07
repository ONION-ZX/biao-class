var el = require('./element')
  , search = require('./search')
;


function detect_submit() {
  el.form.addEventListener('submit',function(e) {
    e.preventDefault();
    var keyword = el.input.value;
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
}

module.exports = {
  add_events: add_events,
  detect_submit: detect_submit,
  click_to_top: click_to_top,
}
