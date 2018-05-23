window.CatUi = CatUi;

/*分组界面管理*/
function CatUi() {
  this.list = document.querySelector('#cat-list');
  this.add_cat = document.querySelector('#add-cat')
  this.cat_form = document.querySelector('#cat-form');
  this._api = new CatApi();
}

CatUi.prototype.render = render;
CatUi.prototype.init = init;
CatUi.prototype.detect_show_form = detect_show_form;
CatUi.prototype.detect_click_form = detect_click_form;
CatUi.prototype.detect_submit_form = detect_submit_form;
CatUi.prototype.detect_click_list = detect_click_list;
CatUi.prototype.show_cat_input = show_cat_input;
CatUi.prototype.hide_cat_input = hide_cat_input;
CatUi.prototype.get_form_data = helper.get_form_data;
CatUi.prototype.set_form_data = helper.set_form_data;
CatUi.prototype.clear_form = helper.clear_form;


function init() {
  this.render();
  this.detect_show_form();
  this.detect_click_form();
  this.detect_submit_form();
  this.detect_click_list();
}

/**
 * 渲染分组列表
 * */
function render() {
  /*先拿到分类列表数据*/
  var cat_list = this._api.read();
  var me = this;
  /*清空上次渲染*/
  this.list.innerHTML = '';
  /*通过循环分类数据生成每一条分类元素*/
  cat_list.forEach(function (row) {
    var el = document.createElement('div'); // 创建元素
    el.classList.add('cat-item', 'row'); // 加类
    el.dataset.id = row.id; // 将id存到元素上，方便后面调用
    el.innerHTML = `
    <div class="input">
        <input type="text" value="${row.title}" disabled>
    </div>
    <div class="tool-set">
      <span class="update">更新</span>
      <span class="delete">删除</span>
    </div>
    `;

    me.list.appendChild(el); // 追加子元素
  });
}

/*当添加分类按钮被点击时做什么*/
function detect_show_form() {
  var me = this;
  this.add_cat.addEventListener('click', function () {
    /*显示分类表单，不然用户没地方写分类信息*/
    me.show_cat_input();
  });
}

/*当分类表单被点击时做什么*/
function detect_click_form() {
  var me = this;
  this.cat_form.addEventListener('click', function (e) {
    var is_cancel_btn = e.target.dataset.action == 'cancel' // 是否为取消按钮
    ;
    if (is_cancel_btn) {
      /*如果是取消按钮就隐藏表单*/
      me.hide_cat_input();
    }
  });
}

/*当表单被提交时做什么*/
function detect_submit_form() {
  var me = this;
  this.cat_form.addEventListener('submit', function (e) {
    e.preventDefault();

    var row = me.get_form_data(me.cat_form); // 拿到表单中的数据
    me._api.add(row); // 调用api添加一行数据
    me.clear_form(me.cat_form); // 添加完毕，清除表单
    me.render();
  });
}

/*当列表被点击时应该做什么*/
function detect_click_list() {
  var me = this;
  this.list.addEventListener('click', function (e) {
    var target        = e.target // 拿到事件源
      , is_delete_btn = target.classList.contains('delete') // 是不是删除按钮
      , id            = target.closest('.cat-item').dataset.id // 拿到所在行的id
    ;

    /*如果点击的是删除按钮*/
    if (is_delete_btn) {
      me._api.remove(id); // 删除对应的那一行数据
      me.render(); // 重新渲染
    }
  });
}

/*显示表单*/
function show_cat_input() {
  this.cat_form.hidden = false;
}

/*隐藏表单*/
function hide_cat_input() {
  this.cat_form.hidden = true;
}
