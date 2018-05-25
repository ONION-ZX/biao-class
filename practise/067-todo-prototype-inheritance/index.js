var task_ui = new TaskUi('#todo-form', '#todo-list', '#todo-input');
var cat_ui = new CatUi({
  on_item_click: function(cat_id) {
    task_ui.render(cat_id);
  }
});
task_ui.init();
cat_ui.init();
