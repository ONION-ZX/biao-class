var pagination = require('../pagination');

pagination.init({
  el: '#page',
  amount: 200,
  limit: 10,
  range: 5,
  current: 12,

  on_page_change: function(page,e) {
    console.log(page);
  }
});
