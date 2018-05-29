var cat_select = document.getElementById('cat-select');

var task_ui = new TaskUi({
  on_init: render_cat_item_option,
  on_input_focus: show_cat_select,
  // on_input_blur: hide_cat_select,
  on_add_succeed: hide_cat_select,
});

var cat_ui = new CatUi({
  on_item_click: render_task,
  on_item_delete: remove_task_by_cat_id,
  on_sync: function(changed_list) {
    render_cat_item_option();
  },
});

function render_task(cat_id) {
  task_ui.render(cat_id);
}

function remove_task_by_cat_id(cat_id) {
  task_ui._api.remove_by_cat_id(cat_id);
  task_ui.render(1);
  }

function render_cat_item_option() {
  var list = cat_ui._api.read();
  cat_select.innerHTML = '';
  if(!list)
    return;
    
  list.forEach(function(row) {
    var el = document.createElement('option');
    el.value = row.id;
    el.innerText = row.title;

    cat_select.appendChild(el);
  });
}

function show_cat_select() {
  cat_select.hidden = false;
}

function hide_cat_select() {
  cat_select.hidden = true;
}

task_ui.init();
cat_ui.init();
