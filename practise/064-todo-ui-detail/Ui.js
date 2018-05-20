window.Ui = Ui;

function Ui(form_selector, list_selector, input_selector) {
  this.form = document.querySelector(form_selector);
  this.list = document.querySelector(list_selector);
  this.input = document.querySelector(input_selector);
  this._api = new Api();
}

Ui.prototype.get_form_data = get_form_data;
Ui.prototype.set_form_data = set_form_data;
Ui.prototype.init = init;
Ui.prototype.render = render;
Ui.prototype.detect_add = detect_add;
Ui.prototype.detect_click_list = detect_click_list;
Ui.prototype.remove = remove;

function init() {
  this.render();
  this.detect_add();
  this.detect_click_list();
}

function detect_click_list() {
  var me = this;
  this.list.addEventListener('click',function(e) {
    var target = e.target
      , is_remove_btn = target.classList.contains('remove');

    if(is_remove_btn) {
      var todo_item = target.closest('.todo-item')
        , id = todo_item.dataset.id
      me.remove(id)
    }
  });
}

//调用Api并更新页面
function remove(id) {
  this._api.remove(id);
  this.render();
}

function render() {
  var todo_list = this._api.read();
  var me = this;
  this.list.innerHTML = '';

  todo_list.forEach(function(item) {
    var el = document.createElement('div');
    el.classList.add('row','todo-item');
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

function detect_add() {
  var me = this;
  this.form.addEventListener('submit',function(e) {
    e.preventDefault();
    var row = me.get_form_data(me.form);

    if(row.id) {
      me._api.update(row.id,row);
    } else {
      me._api.add(row);
    }
    me.render();
    me.input.value = '';
  });
}

function get_form_data(form) {
  var data = {};
  var list = form.querySelectorAll('[name]');

  list.forEach(function(input) {
    switch (input.nodeName) {
      case 'INPUT':
        switch (input.type) {
          case 'search':
          case 'text':
          case 'number':
          case 'password':
          case 'hidden':
            data[input.name] = input.value;
            break;
          case 'checkbox':
          case 'radio':
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

function set_form_data(form,data) {
  for(var key in data) {
    var value = data[key];
    var input = form.querySelector(`[name=${key}]`);
    if(!input)
      continue;
    var data_type = typeof value;
    switch (data_type) {
      case 'number':
      case 'string':
        input.value = value;
        break;
      case 'boolean':
        input.checked = value;
        break;
    }
  }
}
