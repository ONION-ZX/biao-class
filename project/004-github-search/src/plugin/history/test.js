var history = require('./history');

history.init = {
  el: '#history-list',
  on_click: function(kwd,e) {
    //可以是用户想要执行的任何操作
    console.log(kwd,e.altKey);
  },
  on_delete: function(kwd,e) {
    e.stopPropagation();
    //可以是用户想要执行的任何操作
    console.log(kwd);
  }
}

history.add('yo1');
