function get(key) {
  var data = localStroage.getItem(key);
  return JSON.parse(data);
}

function set(key,val) {
  var json = JSON.stringify(val);
  localStorage.setItem(key,json);
}

module.exports = {
  set:set,
  get: get,
}
