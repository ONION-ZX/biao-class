var history = require('./history');

history.init({
  el: '#history-list',
  on_click: function(kwd,e) {
    console.log(kwd);
  },
  on_delete: function(kwd,e) {
    e.stopPropagation();
    console.log(kwd);
  }
});

history.add('onion');
history.add('zheng');
