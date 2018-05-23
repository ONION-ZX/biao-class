window.helper = {
  get_form_data: get_form_data,
  set_form_data: set_form_data,
  clear_form: clear_form,
}

function get_form_data(form) {
  /*判断传参是选择器还是表单元素,如果是选择器则必定为字符串*/
  if(typeof data == 'string')
    var form = document.querySelector(form);
  var data = {};
  var list = form.querySelectorAll('[name]');
  list.forEach(function(input) {
    switch (input.Nodename) {
      case 'INPUT':
        switch (input.type) {
          case 'text':
          case 'search':
          case 'number':
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

function set_form_data(form, data) {
  if(typeof form == 'string')
    var form = document.querySelector(form);

  for(var key in data) {
    var value = data[key];
    var input = form.querySelector(`[name=${key}]`);

    if(!input)
      continue;
    var data_type = typeof value;

    switch (data_type) {
      case 'string':
      case 'number':
        input.value = input.value;
        break;
      case 'boolean':
        input.checked = input.value;
        break;
    }
  }
}

function clear_form(form) {
  if(typeof form == 'string')
    var form = document.querySelector(form);

  form.querySelectorAll('[name]').forEach(function(input) {
    if(input.type == 'radio' || input.type == 'checkbox')
      input.checked = false;
    input.value = '';
  });
}
