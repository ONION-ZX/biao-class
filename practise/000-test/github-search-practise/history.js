init();

var el_history_list = document.getElementById('history-list')
  , history_list
;

function init() {
  reload_history_list();
  render_history_list();

  detect_submit();
  detect_click_pagination();
  detect_click_top();
}

function store_get(key) {
  var json = localStorage.getItem(key);
  return JSON.parse(json);
}

function store_set(key,val) {
  var data = JSON.stringify(val);
  localStorage.setItem(key,data);
}

function reload_history_list() {
  history_list = store_get('history');
}

function render_history_list() {
  el_history_list.innerHTML = '';
  history_list.forEach(function(history) {
    var el_history = document.createElement('div');
    el_history.classList.add('history');
    el_history.dataset.history = history;

    el_history.innerHTML = `
      <div class="text">${history}</div>
      <div class="tool">
        <span class="delete">删除</span>
      </div>
    `;
    el_history_list.appendChild(el_history);
    el_history.addEventListener('click',function(e) {
      if(e.target.classList.contains('delete');
    })
  });
}
