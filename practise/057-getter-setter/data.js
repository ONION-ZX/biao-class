var name = 'whh';
var age = 19;

function get_age() {
  return age;
}

function set_age(val) {
  return age = val;
}

function get_name() {
  return name;
}

function set_name(val) {
  return name = val;
}

module.exports = {
  set_age: set_age,
  get_age: get_age,
  set_name: set_name,
  get_name: get_name,
}
