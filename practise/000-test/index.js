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

/*监听添加事件（表单提交事件）*/
function detect_add() {
  var me = this;
  this.form.addEventListener('submit', function (e) {
    e.preventDefault();

    /*将表单中的数据转化成纯数据对象 {id: xxx, title: '吃饭', ... } */
    var row = me.get_form_data(me.form);

    /*如果数据中有id，说明是更新旧数据，
    * 否则为添加新数据*/
    if (row.id) {
      /*更新一条*/
      me._api.update(row.id, row);
    } else {
      /*新增一条*/
      me._api.add(row);
    }
    /*更新界面*/
    me.render();
    /*清空输入框*/
    me.input.value = '';
  });
}

/*监听任务列表点击事件*/
function detect_click_list() {
  var me = this;
  this.list.addEventListener('click', function (e) {
    var target = e.target // 点击源
      , todo_item = target.closest('.todo-item') // 被点击的.todo-item，没有这个元素，就拿不到id
      , id = todo_item.dataset.id // 拿到id
      , is_remove_btn = target.classList.contains('remove') // 点击的是否为删除按钮
      , is_update_btn = target.classList.contains('update') // 点击的是否为更新按钮
    ;

    if (is_remove_btn) {
      /*找到按钮所在的.todo-item，因为.todo-item上有当前任务的id*/
      me.remove(id);
    } else if (is_update_btn) {
      /*通过id得到相对应的那条数据对象 {id: xxx, title: '吃饭', ... }*/
      var row = me._api.read(id);
      /*填充表单*/
      me.set_form_data(me.form, row);
    }
  });
}

function update(id, new_row) {

}

function remove(id) {
  /*删数据*/
  this._api.remove(id);
  /*重新渲染*/
  this.render();
}

/*渲染任务列表*/
function render() {
  /*先通过api拿到所有数据*/
  var todo_list = this._api.read();
  var me = this;

  /*清空上次渲染的数据*/
  this.list.innerHTML = '';

  /*遍历所有的任务数据，生成每一条html元素，并插入到任务列表中*/
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
            /*如果是字符类数据，使用用户输入的值*/
            data[input.name] = input.value;
            break;
          case 'radio':
          case 'checkbox':
            /*如果是打钩类数据，使用打钩的状态（打|没打）*/
            data[input.name] = input.checked;
            break;
        }
        // console.log(input);
        break;
      case 'TEXTAREA':
        data[input.name] = input.value;
        break;
    }
  });

  return data;
}

function set_form_data(form, data) {
  /*遍历数据对象*/
  for (var key in data) {
    /*缓存当前属性的值*/
    var value = data[key];
    /*找到当前属性在表单中对应的input*/
    var input = form.querySelector(`[name=${key}]`);

    if (!input)
      continue;

    /*获取当前属性的数据类型*/
    var data_type = typeof value;

    switch (data_type) {
      /*如果是字符串或者数字，就默认其为input[type=number|text|url|...]*/
      case 'string':
      case 'number':
        input.value = value;
        break;
      /*如果是布尔值，就默认其为input[type=radio|checkbox]*/
      case 'boolean':
        input.checked = value;
        break;
    }
  }
}
