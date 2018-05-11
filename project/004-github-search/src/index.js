var history = require('./history')
  , event = require('./event')
;

init();

function init() {
  history.reload_list();
  history.render_list();
  event.bind_all();
}
