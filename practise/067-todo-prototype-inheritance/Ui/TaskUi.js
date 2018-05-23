window.TaskUi = TaskUi;
test_list = [
  {
    id        : 100,
    title     : '买菜',
    completed : false,
    group_id  : 1,
  },
  {
    id        : 101,
    title     : '洗菜',
    completed : false,
    group_id  : 1,
  },
  {
    id        : 102,
    title     : '背单词',
    completed : false,
    group_id  : 2,
  },
]

function TaskUi(form_selector, list_selector, input_selector) {
  this.form = document.querySelector(form_selector);
  this.input = document.querySelector(input_selector);
  this.list = document.querySelector(list_selector);
  this._api = new TaskApi(test_list);
}

TaskUi.prototype.get_form_data = helper.get_form_data;
TaskUi.prototype.set_form_data = helper.set_form_data;
TaskUi.prototype.render = render;
TaskUi.prototype.init = init;
TaskUi.prototype.detect_add = detect_add;
TaskUi.prototype.detect_click_list = detect_click_list;
TaskUi.prototype.remove = remove;

function init() {
  this.render();
  this.detect_add();
  this.detect_click_list();
}

function detect_add() {
  var me = this;
  this.form.addEventListener('submit', function (e) {
    e.preventDefault();

    var row = me.get_form_data(me.form);

    if (row.id) {
      me._api.update(row.id, row);
    } else {
      me._api.add(row);
    }
    me.render();
    me.input.value = '';
  });
}

function detect_click_list() {
  var me = this;
  this.list.addEventListener('click', function (e) {
    var target = e.target
      , todo_item = target.closest('.todo-item')
      , id = todo_item.dataset.id
      , is_remove_btn = target.classList.contains('remove')
      , is_update_btn = target.classList.contains('update')
    ;

    if (is_remove_btn) {
      me.remove(id);
    } else if (is_update_btn) {
      var row = me._api.read(id);
      me.set_form_data(me.form, row);
    }
  });
}

function remove(id) {
  this._api.remove(id);
  this.render();
}

function render() {
  var todo_list = this._api.read();
  var me = this;

  this.list.innerHTML = '';
  
  todo_list.forEach(function (item) {
    var el = document.createElement('div');

    el.classList.add('row', 'todo-item');
    el.dataset.id = item.id;

    el.innerHTML = `
      <div class="col checkbox">
        <input type="checkbox">
      </div>
      <div class="col detail">
        <div class="title">${item.title}</div>
      </div>
      <div class="col tool-set">
        <button class="update">更新</button>
        <button class="remove">删除</button>
      </div>
    `;

    me.list.appendChild(el);
  });
}
