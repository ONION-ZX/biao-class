var history = require('./history');

history.init({
  el: '#history-list',
  on_click: function (kwd, e) {
    console.log(kwd, e.altKey);
  },
  on_delete: function (keyword, e) {
    e.stopPropagation();
    console.log(keyword);
  }
});

// history.add('yo1');
// history.add('yo2');
// history.add('yo3');
// history.remove('yo2');
// history.clear();
