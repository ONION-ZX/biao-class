var cat_select = document.getElementById('cat-select');

var task_ui = new TaskUi({
  on_init: render_cat_item_option,
});
var cat_ui = new CatUi({
  on_item_click: function(cat_id) {
    task_ui.render(cat_id);
  },
  on_item_delete: function(cat_id) {
    task_ui._api.remove_by_cat_id(cat_id);
    task_ui.render(1);
  }
});

function render_cat_item_option() {
  var list = cat_ui._api.read();

  list.forEach(function(row) {
    var el = document.createElement('option');
    el.value = row.id;
    el.innerHTML = row.title;

    cat_select.appendChild(el);
  });
}

task_ui.init();
cat_ui.init();
