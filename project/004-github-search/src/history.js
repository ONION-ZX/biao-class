var el_list = document.getElementById('history-list')
  , list
;

//防止LocalStorage中出现重复的历史记录
function append(kwd) {
  // 先删
  find_and_delete(list, kwd);
  list.unshift(kwd);
  overwrite_list(list);
}

//重写历史列表
function overwrite_list(data) {
  store_set('list', data);
}

function show_list() {
  if (!list || !list.length)
    return;
  el_list.hidden = false;
}

function hide_list() {
  el_list.hidden = true;
}

function reload_list() {
  list = store_get('list');
}

function render_list() {
  el_list.innerHTML = '';
  list.forEach(function(history) {
    var el_delete, el_history = document.createElement('div');
    el_history.classList.add('history');
    el_history.dataset.history = history;
    el_history.innerHTML = `
      <div class="text">${history}</div>
      <div class="tool">
        <span class="delete">删除</span>
      </div>
    `;
    el_delete = el_history.querySelector('.delete');
    el_list.appendChild(el_history);
    el_history.addEventListener('click', function(e) {
      //若点击到删除按钮直接返回(不上屏也不搜索)
      if (e.target.classList.contains('delete'))
        return;
      //当本条历史记录被点击时将搜索框的关键词改为对应的历史关键词
      set_keyword(this.dataset.history);
      search();
    });

    el_delete.addEventListener('click', function() {
      var el_history = this.closest('.history')
        //当删除按钮被点击时，找到被删除的那条
        ,
        kwd = el_history.dataset.history;

      if (find_and_delete(list, kwd)) {
        overwrite_list(list);
        // 重新渲染
        setTimeout(function() {
          render_list();
        }, 0);

        if (!list.length) {
          el_list.hidden = true;
        }
      }
    });
  });
}

function find_and_delete(arr, element) {
  var shit_index = arr.indexOf(element);
  //如果删除失败 直接返回
  if (shit_index == -1)
    return false;

  arr.splice(shit_index, 1);
  return true;
}

function set_keyword(kwd) {
  el_input.value = kwd;
  keyword = kwd;
}
