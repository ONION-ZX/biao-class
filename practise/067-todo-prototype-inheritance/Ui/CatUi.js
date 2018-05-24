window.CatUi = CatUi;

function CatUi() {
  this.list = document.querySelector('#cat-list');
  this.cat_form = document.querySelector('#cat-form');
  this.add_cat_btn = document.querySelector('#add-cat-btn');
  this._api = new CatApi();
  this.updating_cat_item = null;
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;
CatUi.prototype.show_cat_form = show_cat_form;
CatUi.prototype.hide_cat_form = hide_cat_form;
CatUi.prototype.show_add_cat_btn = show_add_cat_btn;
CatUi.prototype.hide_add_cat_btn = hide_add_cat_btn;
CatUi.prototype.detect_click_add_cat_btn = detect_click_add_cat_btn;
CatUi.prototype.detect_form_submit = detect_form_submit;
CatUi.prototype.detect_click_form = detect_click_form;
CatUi.prototype.detect_click_list = detect_click_list;
CatUi.prototype.get_form_data = helper.get_form_data;
CatUi.prototype.set_form_data = helper.set_form_data;
CatUi.prototype.clear_form = helper.clear_form;

function init() {
  this.render();
  this.detect_click_add_cat_btn();
  this.detect_form_submit();
  this.detect_click_form();
  this.detect_click_list();
}

function render() {
  var me = this;
  var cat_list = this._api.read();
  this.list.innerHTML = '';

  cat_list.forEach(function(row) {
    var el = document.createElement('div');
    el.classList.add('row','cat-item');
    el.dataset.id = row.id;

    el.innerHTML = `
      <div class = "title">
        <div>${row.title}</div>
      </div>
      <div class = "tool-set">
      ${
        row.id == 1?
        '':
        '<span class = "update">更新</span><span class = "delete">删除</span>'
      }
      </div>;
    `;
    me.list.appendChild(el);
  });
}

function detect_click_add_cat_btn() {
  var me = this;
  this.add_cat_btn.addEventListener('click',function(e) {
    me.show_cat_form();
  });
}

function detect_form_submit() {
  var me = this;
  this.cat_form.addEventListener('submit',function(e) {
    e.preventDefault();
    var row = me.get_form_data(me.cat_form);

    if(row.id) {
      me._api.update(row.id, row);
    } else {
      me._api.add(row);
    }
    me.render();
    me.clear_form(me.cat_form);
  });
}

function detect_click_form() {
  var me = this;
  this.cat_form.addEventListener('click',function(e) {
    var target = e.target
      , is_cancel_btn = target.dataset.action == 'cancel';

      if(is_cancel_btn) {
        me.hide_cat_form();
        me.show_add_cat_btn();
      }
  });
}

function detect_click_list() {
  var me = this;
  this.list.addEventListener('click',function(e) {
    var target = e.target
      , cat_item = target.closest('.cat-item')
      , is_delete_btn = target.classList.contains('delete')
      , is_update_btn = target.classList.contains('update');

    if(cat_item) {
      var id = cat_item.dataset.id;
    }

      if(is_delete_btn) {
        me._api.remove(id);
        me.render();
      }
  });
}

function show_add_cat_btn() {
  this.add_cat_btn.hidden = false;
}

function hide_add_cat_btn() {
  this.add_cat_btn.hidden = true;
}

function show_cat_form(){
  this.cat_form.hidden = false;
}

function hide_cat_form(){
  this.cat_form.hidden = true;
}
