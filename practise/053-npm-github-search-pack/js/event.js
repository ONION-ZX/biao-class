/*事件处理相关*/

var el = require('./element')
  , search = require('./search')
  , page = 1
  , limit = 5
  , keyword
;

/*监听搜索表单提交事件*/
function detect_submit() {
  el.form.addEventListener('submit', function (e) {
    e.preventDefault();
    /*获取搜索关键词（获取input元素的值）*/
    keyword = el.input.value;

    /*开始搜*/
    search.user(keyword, function (data) {
      var items = data.items;
      el.render_user_list(items);

    });
  });
}

function detect_next_page() {

  el.next.addEventListener('click', function () {
    /*准备配置*/
    var config = {
      page: page++,
      limit: limit,
    };

    /*开始搜索*/
    search.user(keyword, function (data) {
      el.render_user_list(data.items);
    }, config);

  });
}

/*批量添加所有初始事件*/
function add_events() {
  detect_submit();
  detect_next_page();
}

module.exports = {
  detect_submit: detect_submit,
  add_events: add_events,
  detect_next_page: detect_next_page,
};
// var el = require('./element')
//   , search = require('./search')
//   , page = 1
//   , limit = 5
//   , keyword
// ;
//
// function detect_submit() {
//   el.form.addEventListener('submit',function(e) {
//     e.preventDefault();
//     keyword = input.value;
//     search.user(keyword,function(data) {
//       el.render_user_list(data.items);
//     });
//   });
// }
//
// function detect_next_page() {
//   el.next.addEventListener('click',function() {
//     var config = {
//       page: page ++,
//       limit: limit,
//     };
//
//     search.user(keyword,function(data) {
//       el.render_user_list(data.items);
//     },config);
//
//   });
// }
//
// function add_events() {
//   detect_submit();
//   detect_next_page();
// }
//
// module.exports = {
//   add_events: add_events,
//   detect_submit: detect_submit,
//   detect_next_page: detect_next_page,
// };
// /*事件处理相关*/
//
// var el = require('./element')
//   , search = require('./search')
//   , page = 1
//   , limit = 5
//   , keyword
// ;
//
// /*监听搜索表单提交事件*/
// function detect_submit() {
//   el.form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     /*获取搜索关键词（获取input元素的值）*/
//     keyword = el.input.value;
//
//     /*开始搜*/
//     search.user(keyword, function (data) {
//       var items = data.items;
//       el.render_user_list(items);
//
//     });
//   });
// }
//
// function detect_next_page() {
//
//   el.next.addEventListener('click', function () {
//     /*准备配置*/
//     var config = {
//       page: page++,
//       limit: limit,
//     };
//
//     /*开始搜索*/
//     search.user(keyword, function (data) {
//       el.render_user_list(data.items);
//     }, config);
//
//   });
// }
//
// /*批量添加所有初始事件*/
// function add_events() {
//   detect_submit();
//   detect_next_page();
// }
//
// module.exports = {
//   detect_submit: detect_submit,
//   add_events: add_events,
//   detect_next_page: detect_next_page,
// };
