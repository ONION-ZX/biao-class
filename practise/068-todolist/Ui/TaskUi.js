window.TaskUi = TaskUi;

function TaskUi(config) {
  var default_config = {
    list_selector: '#todo-list',
    input_selector: '#todo-input',
    form_selector: '#todo-form',
    completed_list_selector: '.completed',
    incomplete_list_selector: '.incomplete',
    on_init: null,
    on_input_focus: null,
    on_add_succeed: null,
    on_input_blur: null,
  }

  var c =this.config = Object.assign({}, default_config, config);

  this.form = document.querySelector(c.form_selector);
  this.input = document.querySelector(c.input_selector);
  this.list = document.querySelector(c.list_selector);
  this.completed_list = this.list.querySelector(c.completed_list_selector);
  this.incomplete_list = this.list.querySelector(c.incomplete_list_selector);
  /*私有，不应该直接调用，仅限此文件内部调用*/
  this._api = new TaskApi();
  this._api.on_sync = c.on_sync;
}

TaskUi.prototype.get_form_data = helper.get_form_data;
TaskUi.prototype.set_form_data = helper.set_form_data;
TaskUi.prototype.render = render;
TaskUi.prototype.init = init;
TaskUi.prototype.detect_add = detect_add;
TaskUi.prototype.detect_click_list = detect_click_list;
TaskUi.prototype.detect_input_focus = detect_input_focus;
TaskUi.prototype.detect_input_blur = detect_input_blur;
TaskUi.prototype.remove = remove;

function init() {
  this.input.focus();
  this.render();
  this.detect_add();
  this.detect_click_list();
  this.detect_input_focus();
  this.detect_input_blur();
  if(this.config.on_init)
  this.config.on_init();
}

function detect_input_focus() {
  var me = this;
  this.input.addEventListener('focus', function () {
    var cb = me.config.on_input_focus;
    if (cb)
      cb();
  });
}

function detect_input_blur() {
  var me = this;
  this.input.addEventListener('blur', function () {
    var cb = me.config.on_input_blur;
    if (cb)
      cb();
  });
}

function detect_add() {
  var me = this;
  this.form.addEventListener('submit', function (e) {
    e.preventDefault();

    var row = me.get_form_data(me.form);
    var cb = me.config.on_add_succeed;

    if (row.id) {
      me._api.update(row.id, row);
    } else {
      me._api.add(row);
    }

    me.render(row.cat_id);
    me.input.value = '';

    if (cb)
      cb();
  });
}

function detect_click_list() {
  var me = this;
  this.list.addEventListener('click', function (e) {
    var target = e.target
      , todo_item = target.closest('.todo-item')
      , id
      , is_remove_btn = target.classList.contains('remove')
      , is_update_btn = target.classList.contains('update')
      , is_checkbox = target.classList.contains('checker')
      , row = me._api.$find(id)
    ;

    if(todo_item)
      id = todo_item.dataset.id;

    if (is_remove_btn) {
      me.remove(id);
    } else if (is_update_btn) {
      me.set_form_data(me.form, row);
    } else if(is_checkbox) {
      me._api.set_completed(id, target.checked);
      me.render();
    } else {
      if(!id)
        return;
    }
  });
}

function remove(id) {
  this._api.remove(id);
  this.render();
}

function render(cat_id) {
  var todo_list = cat_id ?
                  this._api.read_by_cat_id(cat_id) :
                  this._api.read();

  var me = this
    , incomplete_holder = `<div class = "empty-holder">您已完成所有待办事项 : )</div>`
    , completed_holder = `<div class = "empty-holder">快到碗里来ʕ•ᴥ•ʔ</div>`;

  this.incomplete_list.innerHTML =
    this.completed_list.innerHTML = '';

  todo_list = todo_list || [];

  todo_list.forEach(function (item) {
    var el = document.createElement('div');

    el.classList.add('row', 'todo-item');
    el.dataset.id = item.id;

    el.innerHTML = `
      <div class="col checkbox">
        <input class = "checker" type="checkbox" ${item.completed ? 'checked' : ''}>
      </div>
      <div class="col detail">
        <div class="title">${item.title}</div>
      </div>
      <div class="col tool-set">
        <button class="update">更新</button>
        <button class="remove">删除</button>
      </div>
    `;
    if(item.completed)
      me.completed_list.appendChild(el);
    else
      me.incomplete_list.appendChild(el);
  });

  if(!this.incomplete_list.innerHTML)
  this.incomplete_list.innerHTML = incomplete_holder;
  if(!this.completed_list.innerHTML)
  this.completed_list.innerHTML = completed_holder;
}
