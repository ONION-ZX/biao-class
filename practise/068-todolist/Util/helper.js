window.helper = {
  get_form_data : get_form_data,
  set_form_data : set_form_data,
  clear_form    : clear_form,
}

function get_form_data(form) {
  if (typeof form == 'string')
    form = document.querySelector(form);

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
      case 'SELECT':
        data[input.name] = input.value;
        break;
    }
  });
  // console.log(data);
  return data;
}

function set_form_data(form, data) {
  if (typeof form == 'string')
    form = document.querySelector(form);

  for (var key in data) {
    var value = data[key];
    var input = form.querySelector(`[name=${key}]`);

    if (!input)
      continue;

    var data_type = typeof value;

    switch (data_type) {
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
function clear_form(form) {
  if (typeof form == 'string')
    form = document.querySelector(form);

  form
    .querySelectorAll('[name]')
    .forEach(function (input) {
      if (input.type == 'radio' || input.type == 'checkbox')
        input.checked = false;
      else
        input.value = '';
    });
}
