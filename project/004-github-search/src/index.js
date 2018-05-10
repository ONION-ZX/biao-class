var history = require('./history')
  , events = require('./events')
;

init();

function init() {
  history.reload_list();
  history.render_list();
  events.bind_all();
}
