function Ui(form_selector,list_selector) {
  this.form = document.querySelector(form_selector);
  this.list = document.querySelector(list_selector);
}

Ui.prototype.set_form_data = set_form_data;
Ui.prototype.get_form_data = get_form_data;

function set_form_data(form_selector,data) {
  var form = document.querySelector(form_selector);

  for(var key in data) {
    var value = data[key];
    var input = form.querySelector(`name=${key}`);

    if(!input)
      continue;

    var data_type = typeof value;

    switch(data_type) {
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

function get_form_data(form_selector) {
  var data = {};
  var form = document.querySelector(form_selector);
  var list = form.querySelectorAll('[name]');

  list.forEach(function(input) {
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
var ui = new Ui('#todo-form','#todo-list');
console.log(ui);
