window.Ui = Ui;

function Ui(form_selector, list_selector, input_selector) {
  this.form = document.querySelector(form_selector);
  this.input = document.querySelector(input_selector);
  this.list = document.querySelector(list_selector);
  /*私有，不应该直接调用，仅限此文件内部调用*/
  this._api = new Api();
}

Ui.prototype.get_form_data = get_form_data;
Ui.prototype.set_form_data = set_form_data;
Ui.prototype.render = render;
Ui.prototype.init = init;
Ui.prototype.detect_add = detect_add;
Ui.prototype.detect_click_list = detect_click_list;
Ui.prototype.remove = remove;

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
      /*更新*/
      me._api.update(row.id, row);
    } else {
      /*新增*/
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
  /*先通过api拿到所有数据*/
  var todo_list = this._api.read();
  var me = this;

  /*清空上次渲染的数据*/
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

function get_form_data(form) {
  var data = {};
  var list = form.querySelectorAll('[name]');

  list.forEach(function (input) {
    switch (input.nodeName) {

      case 'INPUT':
        switch (input.type) {
          case 'text':
          case 'search':
          case 'number':
          case 'password':
          case 'hidden':
            data[input.name] = input.value;
            break;
          case 'radio':
          case 'checkbox':
            data[input.name] = input.checked;
            break;
        }
        break;
      case 'TEXTAREA':
        data[input.name] = input.value;
        break;
    }
  });

  return data;
}

function set_form_data(form, data) {
  for (var key in data) {
    var value = data[key];
    var input = form.querySelector(`[name=${key}]`);

    if (!input)
      continue;

    var data_type = typeof value;

    switch (data_type) {
      case 'string':
      case 'number':
        input.value = value;
        break;
      case 'boolean':
        input.checked = value;
        break;
    }
  }
}
