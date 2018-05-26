window.CatUi = CatUi;

function CatUi(config) {
  var default_config = {
    list_selector: '#cat-list',
    form_selector: '#cat-form',
    add_cat_btn_selector : '#add-cat-btn',
    on_item_click : null,
  }

  var c = this.config = Object.assign({}, default_config, config);

  this.list = document.querySelector(c.list_selector);
  this.cat_form = document.querySelector(c.form_selector);
  this.add_cat_btn = document.querySelector(c.add_cat_btn_selector);

  this._api = new CatApi();
  this.updating_cat_item = null;
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;
CatUi.prototype.show_cat_form = show_cat_form;
CatUi.prototype.hide_cat_form = hide_cat_form;
CatUi.prototype.show_add_cat_btn = show_add_cat_btn;
CatUi.prototype.hide_add_cat_btn = hide_add_cat_btn;
CatUi.prototype.show_updating_cat_item = show_updating_cat_item;
CatUi.prototype.detect_click_add_cat_btn = detect_click_add_cat_btn;
CatUi.prototype.detect_form_submit = detect_form_submit;
CatUi.prototype.detect_click_form = detect_click_form;
CatUi.prototype.detect_click_list = detect_click_list;
CatUi.prototype.set_active_cat_item = set_active_cat_item;
CatUi.prototype.reset_form_location = reset_form_location;
CatUi.prototype.get_form_data = helper.get_form_data;
CatUi.prototype.set_form_data = helper.set_form_data;
CatUi.prototype.clear_form = helper.clear_form;

function init() {
  this.render();
  this.detect_click_add_cat_btn();
  this.detect_form_submit();
  this.detect_click_form();
  this.detect_click_list();
  this.set_active_cat_item();
}

function render() {
  var me = this;
  this.reset_form_location();
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
    me.hide_add_cat_btn();
  });
}

function detect_form_submit() {
  var me = this;
  this.cat_form.addEventListener('submit',function(e) {
    e.preventDefault();
    var row = me.get_form_data(me.cat_form);

    if(row.id) {
      me._api.update(row.id, row);
      me.show_updating_cat_item();
      me.hide_cat_form();
      me.show_add_cat_btn();
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
        if(me.updating_cat_item)
          me.show_updating_cat_item();
        me.reset_form_location();
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
      // me.detect_click_cat_item();
      // cat_item.classList.add('active');
      var id = parseInt(cat_item.dataset.id);
      set_active_cat_item();
      cat_item.classList.add('active');
    }

      if(is_delete_btn) {
        me._api.remove(id);
        me.render();
      } else if(is_update_btn) {
        if(me.updating_cat_item)
          me.show_updating_cat_item();;

        me.show_cat_form();
        me.hide_add_cat_btn();
        var row = me._api.$find(id);
        me.set_form_data(me.cat_form, row);

        cat_item.hidden = true;
        cat_item.insertAdjacentElement('afterend', me.cat_form);
        me.updating_cat_item = cat_item;
      } else {
          if(!id)
            return;

          if(me.config.on_item_click)
            me.config.on_item_click(id);
      }
  });
}

function set_active_cat_item() {
  var cat_list = document.querySelectorAll('.cat-item');
  cat_list.forEach(function(cat_item) {
    cat_item.classList.remove('active');
  });
  // cat_list.forEach(function(cat_item) {
  //   if(cat_item.dataset.id == id)
  //     cat_item.classList.add('active');
  //   else
  //     cat_item.classList.remove('active');
  // });
}

function reset_form_location() {
  this.list.insertAdjacentElement('afterend',this.cat_form);
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

function show_updating_cat_item() {
  this.updating_cat_item.hidden = false;
}
