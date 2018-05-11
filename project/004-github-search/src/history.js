var store = require('./util/store')
  , el_list = document.getElementById('history-list')
  , util = require('./util/helper')
  , search = require('./search')
;

var list;

function reload_list() {
  list = store.get('list') || [];
}

function overwrite_list(data) {
  store.set('list', data);
}

/*渲染历史记录*/
function render_list() {
  el_list.innerHTML = '';
  list.forEach(function (history) {
    var el_delete
      , el_history = document.createElement('div');

    el_history.classList.add('history');
    el_history.dataset.history = history;
    el_history.innerHTML = `
        <div class="text">${history}</div>
        <div class="tool">
          <span class="delete">删除</span>
        </div>`;
    el_delete = el_history.querySelector('.delete');
    el_list.appendChild(el_history);

    /*当本条历史记录被点击时将搜索框的关键词改为对应的历史关键词*/
    el_history.addEventListener('click', function (e) {
      /*如果点的是里面的删除按钮，就直接返回，既不上屏，又不搜索*/
      if (e.target.classList.contains('delete'))
        return;

      /*上屏*/
      search.set_keyword(this.dataset.history);
      /*搜搜*/
      search.search();
    });

    /*当删除按钮点击时*/
    el_delete.addEventListener('click', on_delete_clicked);
  });
}

function on_delete_clicked() {
  /*先找到叫.history的先人，因为它那里存着对应的关键词*/
  var el_history = this.closest('.history')
    , kwd = el_history.dataset.history;

  /*如果删除失败，直接返回*/
  if (!util.find_and_delete(list, kwd))
    return;

  /*否则用新数据覆盖冰箱里的数据*/
  overwrite_list(list);
  /*重新渲染历史记录*/
  setTimeout(function () {
    render_list();
  }, 100);

  /*如果没有历史记录了就隐藏整个记录列表*/
  if (!list.length) {
    el_list.hidden = true;
  }
}

function show_list() {
  if (!list.length)
    return;

  el_list.hidden = false;
}

function hide_list() {
  el_list.hidden = true;
}


/*将关键词写入历史记录*/
function append(kwd) {
  console.log(kwd);
  /*不管有没有已经搜过的先删一遍再说*/
  util.find_and_delete(list, kwd);
  /*更新炒瓢数据*/
  list.unshift(kwd);
  /*更新冰箱数据*/
  overwrite_list(list);
}

module.exports = {
  reload_list: reload_list,
  render_list: render_list,
  show_list: show_list,
  hide_list: hide_list,
  append: append,
}
