var config
  , page_amount // amount / limit
  , el_pagination_list // 封装数字页码
  , el_pagination_fieldset // <fieldset>用于快速禁用所有按钮和其他输入组件
  , default_config = {
    amount: null,
    limit: null,
    range: 5,
    current: 1,
  }
  /*导出接口*/
  , output = {
    init: init,
    change_page: change_page,
    disable: disable,
    enable: enable,
    is_disabled: is_disabled,
  }
;

/*初始化
* @param Object config 用于配置插件
* {
*   -------属性--------
*   el: 选择器 // 必填项
*   amount: 总数 // 必填项
*   limit: 每页显示数 // 必填项
*   range: 可见按钮数 // 默认为5
*   current: 指定当前页 // 默认为1
*   -------方法--------
*   on_page_change() // 当页面发生改变时触发使用者的函数
* }
* */
function init(user_config) {
  el = document.querySelector(user_config.el);

  if (!el)
    throw 'Invalid root element.';

  if (!user_config.amount || !user_config.limit)
    throw 'Required config.amount and config.limit.';

  /*合并默认配置和用户配置*/
  config = Object.assign({}, default_config, user_config);

  /*通过amount/limit得到总页数*/
  calc_page_amount();

  change_page(config.current, true);

  render_init();

  /*渲染数字按钮*/
  render_list();
}

/*渲染插件基本结构*/
function render_init() {
  el.classList.add('pagination');

  el.innerHTML = `
  <fieldset class="pagination-fieldset">
    <div class="pagination-pre">
      <button class="pagination-first">First</button>
      <button class="pagination-prev">Prev</button>
    </div>
    <div class="pagination-list"></div>
    <div class="pagination-post">
      <button class="pagination-next">Next</button>
      <button class="pagination-last">Last</button>
    </div>
  </fieldset>
  `;

  el_pagination_list = el.querySelector('.pagination-list');
  el_pagination_fieldset = el.querySelector('.pagination-fieldset');

  el.addEventListener('click', function (e) {
    var target = e.target
      , is_numeric_btn = target.classList.contains('pagination-item')
      , first = target.classList.contains('pagination-first')
      , last = target.classList.contains('pagination-last')
      , prev = target.classList.contains('pagination-prev')
      , next = target.classList.contains('pagination-next')
    ;

    if (is_numeric_btn) { // 如果是数字按钮
      var page = parseInt(target.dataset.page);
      change_page(page);
    } else if (first) {
      change_page(1);
    } else if (last) {
      change_page(page_amount);
    } else if (prev) {
      change_page(config.current - 1);
    } else if (next) {
      change_page(config.current + 1);
    }

    render_list();
  });
}


function render_list() {
  el_pagination_list.innerHTML = '';

  var between = calc_start_and_end()
    , start = between.start
    , end = between.end
  ;

  /*生成翻页按钮*/
  for (var i = start; i <= end; i++) {
    var btn = document.createElement('button');
    btn.innerText = i;
    btn.classList.add('pagination-item');
    btn.dataset.page = i;
    el_pagination_list.appendChild(btn);

    if (i == config.current)
      btn.classList.add('active');
  }
}

/*计算数字按钮的开始和结束*/
function calc_start_and_end() {
  var start
    , end
    , middle = Math.ceil(config.range / 2)
    , reaching_left = config.current <= middle
    , reaching_right = config.current >= page_amount - middle
  ;

  if (reaching_left) {
    start = 1;
    end = config.range;
  } else if (reaching_right) {
    start = page_amount - (config.range - 1);
    end = page_amount;
  } else {
    start = config.current - (middle - 1);
    end = config.current + (middle - 1);
  }

  return {start: start, end: end};
}

/*计算一共有多少页*/
function calc_page_amount() {
  page_amount = Math.ceil(config.amount / config.limit);
}

function change_page(page, force) {
  var old = config.current;

  config.current = page;

  if (page > page_amount)
    config.current = page_amount;

  if (page < 1)
    config.current = 1;

  if (!force && old == config.current)
    return;

  if (config.on_page_change)
    config.on_page_change(config.current);
}

/*禁用组件*/
function disable() {
  el_pagination_fieldset.disabled = true;
}

/*启用组件*/
function enable() {
  el_pagination_fieldset.disabled = false;
}

/*组件禁用状态*/
function is_disabled() {
  return el_pagination_fieldset.disabled;
}

module.exports = output;
