export {helper};

let helper = {
  clone: function(val) {
    return JSON.parse(JSON.stringify(val));

  },
  set: function(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
  },

  get: function(key) {
    var json = localStorage.getItem(key);
    return JSON.parse(json);
  }
}