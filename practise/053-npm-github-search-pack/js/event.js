/*事件处理相关*/
let el = require('./element'),
    search = require('./search'),
    page = 2,
    limit = 5,
    keyword
;

/*监听搜索表单提交事件*/
function detect_submit() {
  el.form.addEventListener('submit', function (e) {
    e.preventDefault();
    /*获取搜索关键词（获取input元素的值）*/
    keyword = el.input.value;
    if (!keyword || keyword == '') {
      alert('你闹呢?');
      return;
    }
    //重置用户列表
    reset_user_list();
    // 开始搜
    search.user(keyword, function (data) {
      el.render_user_list(data.items);
    },{});
  });
}

function reset_user_list() {
    el.user_list.innerHTML = '';
}

function detect_next_page() {

  el.next.addEventListener('click', function () {
    /*准备配置*/
    let config = {
      page: page++,
      limit: limit,
    };

    /*开始搜索*/
    search.user(keyword, function (data) {
      el.render_user_list(data.items);
    }, config);
  });
}

function click_to_top() {
  el.top.addEventListener('click',function() {
    window.scrollTo(0,0);
  });
}

/*批量添加所有初始事件*/
function add_events() {
  detect_submit();
  detect_next_page();
  click_to_top();
}

module.exports = {
  detect_submit: detect_submit,
  add_events: add_events,
  detect_next_page: detect_next_page,
};

// let el = require('./element')
// , search = require('./search')
// ;
//
// function detect_submit() {
//   el.form.addEventListener('submit',function(e) {
//     e.preventDefault();
//     var keyword = el.input.value;
//     search.user(keyword,function(data) {
//       console.log(data);
//     });
//   });
// }
//
// function add_events() {
//   detect_submit();
// }
//
// module.exports = {
//   add_events: add_events,
//   detect_submit: detect_submit,
// }
