var helper = require('../../util/helper')
  , store = require('../../util/store')
;

var list = []
  , el
;

var output = {
  init: init,
  add: add,
  remove: remove,
  clear: clear,
}

function init(config) {
  el = document.querySelector(config.el);
  on_click = config.on_click;
  on_delete = config.on_delete;

  if(!config || !config.el)
    throw 'invalid root element';

  sync_to_ladle();
  render();
}

function sync_to_store() {
  store.set('history_list',list)
}

function sync_to_ladle() {
  store.get('history_list');
}

function add(keyword) {
  helper.find_and_delete(list,keyword);
  list.unshift(keyword);
  sync_to_store();
  render();
}

function remove(keyword) {
  helper.find_and_delete(list,keyword);
  sync_to_ladle();
  render();
}

function clear() {
  list = [];
}

function render() {
  el.innerHTML = '';

  list.forEach(function(keyword) {
    var el_keyword = document.createElement('div');
      el_keyword.innerHTML = `
      <div class="text">${keyword}</div>
      <div class="tool">
        <span class="delete">删除</span>
      </div>`;

    el_keyword.classList.add('history');

    el.appendChild(el_keyword);

    el_keyword.addEventListener('click',function(e) {

      if(on_click)
          on_click(keyword,e);
    });

    el_keyword.querySelector('.delete').addEventListener('click',function(e) {
      if(on_delete)
        on_delete(keyword,e);

      remove(keyword);
    });
  });
}

module.exports = output;
