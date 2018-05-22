/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pagination.js":
/*!***********************!*\
  !*** ./pagination.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var config\r\n  , page_amount // amount / limit\r\n  , el_pagination_list // 封装数字页码\r\n  , el_pagination_fieldset // <fieldset>用于快速禁用所有按钮和其他输入组件\r\n  , default_config = {\r\n    amount: null,\r\n    limit: null,\r\n    range: 5,\r\n    current: 1,\r\n  }\r\n  /*导出接口*/\r\n  , output = {\r\n    init: init,\r\n    change_page: change_page,\r\n    disable: disable,\r\n    enable: enable,\r\n    is_disabled: is_disabled,\r\n  }\r\n;\r\n\r\n/*初始化\r\n* @param Object config 用于配置插件\r\n* {\r\n*   -------属性--------\r\n*   el: 选择器 // 必填项\r\n*   amount: 总数 // 必填项\r\n*   limit: 每页显示数 // 必填项\r\n*   range: 可见按钮数 // 默认为5\r\n*   current: 指定当前页 // 默认为1\r\n*   -------方法--------\r\n*   on_page_change() // 当页面发生改变时触发使用者的函数\r\n* }\r\n* */\r\nfunction init(user_config) {\r\n  el = document.querySelector(user_config.el);\r\n\r\n  if (!el)\r\n    throw 'Invalid root element.';\r\n\r\n  if (!user_config.amount || !user_config.limit)\r\n    throw 'Required config.amount and config.limit.';\r\n\r\n  /*合并默认配置和用户配置*/\r\n  config = Object.assign({}, default_config, user_config);\r\n\r\n  /*通过amount/limit得到总页数*/\r\n  calc_page_amount();\r\n\r\n  change_page(config.current, true);\r\n\r\n  render_init();\r\n\r\n  /*渲染数字按钮*/\r\n  render_list();\r\n}\r\n\r\n/*渲染插件基本结构*/\r\nfunction render_init() {\r\n  el.classList.add('pagination');\r\n\r\n  el.innerHTML = `\r\n  <fieldset class=\"pagination-fieldset\">\r\n    <div class=\"pagination-pre\">\r\n      <button class=\"pagination-first\">First</button>\r\n      <button class=\"pagination-prev\">Prev</button>\r\n    </div>\r\n    <div class=\"pagination-list\"></div>\r\n    <div class=\"pagination-post\">\r\n      <button class=\"pagination-next\">Next</button>\r\n      <button class=\"pagination-last\">Last</button>\r\n    </div>\r\n  </fieldset>\r\n  `;\r\n\r\n  el_pagination_list = el.querySelector('.pagination-list');\r\n  el_pagination_fieldset = el.querySelector('.pagination-fieldset');\r\n\r\n  el.addEventListener('click', function (e) {\r\n    var target = e.target\r\n      , is_numeric_btn = target.classList.contains('pagination-item')\r\n      , first = target.classList.contains('pagination-first')\r\n      , last = target.classList.contains('pagination-last')\r\n      , prev = target.classList.contains('pagination-prev')\r\n      , next = target.classList.contains('pagination-next')\r\n    ;\r\n\r\n    if (is_numeric_btn) { // 如果是数字按钮\r\n      var page = parseInt(target.dataset.page);\r\n      change_page(page);\r\n    } else if (first) {\r\n      change_page(1);\r\n    } else if (last) {\r\n      change_page(page_amount);\r\n    } else if (prev) {\r\n      change_page(config.current - 1);\r\n    } else if (next) {\r\n      change_page(config.current + 1);\r\n    }\r\n\r\n    render_list();\r\n  });\r\n}\r\n\r\n\r\nfunction render_list() {\r\n  el_pagination_list.innerHTML = '';\r\n\r\n  var between = calc_start_and_end()\r\n    , start = between.start\r\n    , end = between.end\r\n  ;\r\n\r\n  /*生成翻页按钮*/\r\n  for (var i = start; i <= end; i++) {\r\n    var btn = document.createElement('button');\r\n    btn.innerText = i;\r\n    btn.classList.add('pagination-item');\r\n    btn.dataset.page = i;\r\n    el_pagination_list.appendChild(btn);\r\n\r\n    if (i == config.current)\r\n      btn.classList.add('active');\r\n  }\r\n}\r\n\r\n/*计算数字按钮的开始和结束*/\r\nfunction calc_start_and_end() {\r\n  var start\r\n    , end\r\n    , middle = Math.ceil(config.range / 2)\r\n    , reaching_left = config.current <= middle\r\n    , reaching_right = config.current >= page_amount - middle\r\n  ;\r\n\r\n  if (reaching_left) {\r\n    start = 1;\r\n    end = config.range;\r\n  } else if (reaching_right) {\r\n    start = page_amount - (config.range - 1);\r\n    end = page_amount;\r\n  } else {\r\n    start = config.current - (middle - 1);\r\n    end = config.current + (middle - 1);\r\n  }\r\n\r\n  return {start: start, end: end};\r\n}\r\n\r\n/*计算一共有多少页*/\r\nfunction calc_page_amount() {\r\n  page_amount = Math.ceil(config.amount / config.limit);\r\n}\r\n\r\nfunction change_page(page, force) {\r\n  var old = config.current;\r\n\r\n  config.current = page;\r\n\r\n  if (page > page_amount)\r\n    config.current = page_amount;\r\n\r\n  if (page < 1)\r\n    config.current = 1;\r\n\r\n  if (!force && old == config.current)\r\n    return;\r\n\r\n  if (config.on_page_change)\r\n    config.on_page_change(config.current);\r\n}\r\n\r\n/*禁用组件*/\r\nfunction disable() {\r\n  el_pagination_fieldset.disabled = true;\r\n}\r\n\r\n/*启用组件*/\r\nfunction enable() {\r\n  el_pagination_fieldset.disabled = false;\r\n}\r\n\r\n/*组件禁用状态*/\r\nfunction is_disabled() {\r\n  return el_pagination_fieldset.disabled;\r\n}\r\n\r\nmodule.exports = output;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdpbmF0aW9uLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnaW5hdGlvbi5qcz9kMmFlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWdcclxuICAsIHBhZ2VfYW1vdW50IC8vIGFtb3VudCAvIGxpbWl0XHJcbiAgLCBlbF9wYWdpbmF0aW9uX2xpc3QgLy8g5bCB6KOF5pWw5a2X6aG156CBXHJcbiAgLCBlbF9wYWdpbmF0aW9uX2ZpZWxkc2V0IC8vIDxmaWVsZHNldD7nlKjkuo7lv6vpgJ/npoHnlKjmiYDmnInmjInpkq7lkozlhbbku5bovpPlhaXnu4Tku7ZcclxuICAsIGRlZmF1bHRfY29uZmlnID0ge1xyXG4gICAgYW1vdW50OiBudWxsLFxyXG4gICAgbGltaXQ6IG51bGwsXHJcbiAgICByYW5nZTogNSxcclxuICAgIGN1cnJlbnQ6IDEsXHJcbiAgfVxyXG4gIC8q5a+85Ye65o6l5Y+jKi9cclxuICAsIG91dHB1dCA9IHtcclxuICAgIGluaXQ6IGluaXQsXHJcbiAgICBjaGFuZ2VfcGFnZTogY2hhbmdlX3BhZ2UsXHJcbiAgICBkaXNhYmxlOiBkaXNhYmxlLFxyXG4gICAgZW5hYmxlOiBlbmFibGUsXHJcbiAgICBpc19kaXNhYmxlZDogaXNfZGlzYWJsZWQsXHJcbiAgfVxyXG47XHJcblxyXG4vKuWIneWni+WMllxyXG4qIEBwYXJhbSBPYmplY3QgY29uZmlnIOeUqOS6jumFjee9ruaPkuS7tlxyXG4qIHtcclxuKiAgIC0tLS0tLS3lsZ7mgKctLS0tLS0tLVxyXG4qICAgZWw6IOmAieaLqeWZqCAvLyDlv4XloavpoblcclxuKiAgIGFtb3VudDog5oC75pWwIC8vIOW/heWhq+mhuVxyXG4qICAgbGltaXQ6IOavj+mhteaYvuekuuaVsCAvLyDlv4XloavpoblcclxuKiAgIHJhbmdlOiDlj6/op4HmjInpkq7mlbAgLy8g6buY6K6k5Li6NVxyXG4qICAgY3VycmVudDog5oyH5a6a5b2T5YmN6aG1IC8vIOm7mOiupOS4ujFcclxuKiAgIC0tLS0tLS3mlrnms5UtLS0tLS0tLVxyXG4qICAgb25fcGFnZV9jaGFuZ2UoKSAvLyDlvZPpobXpnaLlj5HnlJ/mlLnlj5jml7bop6blj5Hkvb/nlKjogIXnmoTlh73mlbBcclxuKiB9XHJcbiogKi9cclxuZnVuY3Rpb24gaW5pdCh1c2VyX2NvbmZpZykge1xyXG4gIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyX2NvbmZpZy5lbCk7XHJcblxyXG4gIGlmICghZWwpXHJcbiAgICB0aHJvdyAnSW52YWxpZCByb290IGVsZW1lbnQuJztcclxuXHJcbiAgaWYgKCF1c2VyX2NvbmZpZy5hbW91bnQgfHwgIXVzZXJfY29uZmlnLmxpbWl0KVxyXG4gICAgdGhyb3cgJ1JlcXVpcmVkIGNvbmZpZy5hbW91bnQgYW5kIGNvbmZpZy5saW1pdC4nO1xyXG5cclxuICAvKuWQiOW5tum7mOiupOmFjee9ruWSjOeUqOaIt+mFjee9riovXHJcbiAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdF9jb25maWcsIHVzZXJfY29uZmlnKTtcclxuXHJcbiAgLyrpgJrov4dhbW91bnQvbGltaXTlvpfliLDmgLvpobXmlbAqL1xyXG4gIGNhbGNfcGFnZV9hbW91bnQoKTtcclxuXHJcbiAgY2hhbmdlX3BhZ2UoY29uZmlnLmN1cnJlbnQsIHRydWUpO1xyXG5cclxuICByZW5kZXJfaW5pdCgpO1xyXG5cclxuICAvKua4suafk+aVsOWtl+aMiemSriovXHJcbiAgcmVuZGVyX2xpc3QoKTtcclxufVxyXG5cclxuLyrmuLLmn5Pmj5Lku7bln7rmnKznu5PmnoQqL1xyXG5mdW5jdGlvbiByZW5kZXJfaW5pdCgpIHtcclxuICBlbC5jbGFzc0xpc3QuYWRkKCdwYWdpbmF0aW9uJyk7XHJcblxyXG4gIGVsLmlubmVySFRNTCA9IGBcclxuICA8ZmllbGRzZXQgY2xhc3M9XCJwYWdpbmF0aW9uLWZpZWxkc2V0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcmVcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tZmlyc3RcIj5GaXJzdDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2XCI+UHJldjwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCI+PC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wb3N0XCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIj5OZXh0PC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJwYWdpbmF0aW9uLWxhc3RcIj5MYXN0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2ZpZWxkc2V0PlxyXG4gIGA7XHJcblxyXG4gIGVsX3BhZ2luYXRpb25fbGlzdCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uLWxpc3QnKTtcclxuICBlbF9wYWdpbmF0aW9uX2ZpZWxkc2V0ID0gZWwucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24tZmllbGRzZXQnKTtcclxuXHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICwgaXNfbnVtZXJpY19idG4gPSB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdpbmF0aW9uLWl0ZW0nKVxyXG4gICAgICAsIGZpcnN0ID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnaW5hdGlvbi1maXJzdCcpXHJcbiAgICAgICwgbGFzdCA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb24tbGFzdCcpXHJcbiAgICAgICwgcHJldiA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb24tcHJldicpXHJcbiAgICAgICwgbmV4dCA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb24tbmV4dCcpXHJcbiAgICA7XHJcblxyXG4gICAgaWYgKGlzX251bWVyaWNfYnRuKSB7IC8vIOWmguaenOaYr+aVsOWtl+aMiemSrlxyXG4gICAgICB2YXIgcGFnZSA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LnBhZ2UpO1xyXG4gICAgICBjaGFuZ2VfcGFnZShwYWdlKTtcclxuICAgIH0gZWxzZSBpZiAoZmlyc3QpIHtcclxuICAgICAgY2hhbmdlX3BhZ2UoMSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3QpIHtcclxuICAgICAgY2hhbmdlX3BhZ2UocGFnZV9hbW91bnQpO1xyXG4gICAgfSBlbHNlIGlmIChwcmV2KSB7XHJcbiAgICAgIGNoYW5nZV9wYWdlKGNvbmZpZy5jdXJyZW50IC0gMSk7XHJcbiAgICB9IGVsc2UgaWYgKG5leHQpIHtcclxuICAgICAgY2hhbmdlX3BhZ2UoY29uZmlnLmN1cnJlbnQgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJfbGlzdCgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcmVuZGVyX2xpc3QoKSB7XHJcbiAgZWxfcGFnaW5hdGlvbl9saXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICB2YXIgYmV0d2VlbiA9IGNhbGNfc3RhcnRfYW5kX2VuZCgpXHJcbiAgICAsIHN0YXJ0ID0gYmV0d2Vlbi5zdGFydFxyXG4gICAgLCBlbmQgPSBiZXR3ZWVuLmVuZFxyXG4gIDtcclxuXHJcbiAgLyrnlJ/miJDnv7vpobXmjInpkq4qL1xyXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuLmlubmVyVGV4dCA9IGk7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgncGFnaW5hdGlvbi1pdGVtJyk7XHJcbiAgICBidG4uZGF0YXNldC5wYWdlID0gaTtcclxuICAgIGVsX3BhZ2luYXRpb25fbGlzdC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIGlmIChpID09IGNvbmZpZy5jdXJyZW50KVxyXG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKuiuoeeul+aVsOWtl+aMiemSrueahOW8gOWni+WSjOe7k+adnyovXHJcbmZ1bmN0aW9uIGNhbGNfc3RhcnRfYW5kX2VuZCgpIHtcclxuICB2YXIgc3RhcnRcclxuICAgICwgZW5kXHJcbiAgICAsIG1pZGRsZSA9IE1hdGguY2VpbChjb25maWcucmFuZ2UgLyAyKVxyXG4gICAgLCByZWFjaGluZ19sZWZ0ID0gY29uZmlnLmN1cnJlbnQgPD0gbWlkZGxlXHJcbiAgICAsIHJlYWNoaW5nX3JpZ2h0ID0gY29uZmlnLmN1cnJlbnQgPj0gcGFnZV9hbW91bnQgLSBtaWRkbGVcclxuICA7XHJcblxyXG4gIGlmIChyZWFjaGluZ19sZWZ0KSB7XHJcbiAgICBzdGFydCA9IDE7XHJcbiAgICBlbmQgPSBjb25maWcucmFuZ2U7XHJcbiAgfSBlbHNlIGlmIChyZWFjaGluZ19yaWdodCkge1xyXG4gICAgc3RhcnQgPSBwYWdlX2Ftb3VudCAtIChjb25maWcucmFuZ2UgLSAxKTtcclxuICAgIGVuZCA9IHBhZ2VfYW1vdW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzdGFydCA9IGNvbmZpZy5jdXJyZW50IC0gKG1pZGRsZSAtIDEpO1xyXG4gICAgZW5kID0gY29uZmlnLmN1cnJlbnQgKyAobWlkZGxlIC0gMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9O1xyXG59XHJcblxyXG4vKuiuoeeul+S4gOWFseacieWkmuWwkemhtSovXHJcbmZ1bmN0aW9uIGNhbGNfcGFnZV9hbW91bnQoKSB7XHJcbiAgcGFnZV9hbW91bnQgPSBNYXRoLmNlaWwoY29uZmlnLmFtb3VudCAvIGNvbmZpZy5saW1pdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV9wYWdlKHBhZ2UsIGZvcmNlKSB7XHJcbiAgdmFyIG9sZCA9IGNvbmZpZy5jdXJyZW50O1xyXG5cclxuICBjb25maWcuY3VycmVudCA9IHBhZ2U7XHJcblxyXG4gIGlmIChwYWdlID4gcGFnZV9hbW91bnQpXHJcbiAgICBjb25maWcuY3VycmVudCA9IHBhZ2VfYW1vdW50O1xyXG5cclxuICBpZiAocGFnZSA8IDEpXHJcbiAgICBjb25maWcuY3VycmVudCA9IDE7XHJcblxyXG4gIGlmICghZm9yY2UgJiYgb2xkID09IGNvbmZpZy5jdXJyZW50KVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBpZiAoY29uZmlnLm9uX3BhZ2VfY2hhbmdlKVxyXG4gICAgY29uZmlnLm9uX3BhZ2VfY2hhbmdlKGNvbmZpZy5jdXJyZW50KTtcclxufVxyXG5cclxuLyrnpoHnlKjnu4Tku7YqL1xyXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xyXG4gIGVsX3BhZ2luYXRpb25fZmllbGRzZXQuZGlzYWJsZWQgPSB0cnVlO1xyXG59XHJcblxyXG4vKuWQr+eUqOe7hOS7tiovXHJcbmZ1bmN0aW9uIGVuYWJsZSgpIHtcclxuICBlbF9wYWdpbmF0aW9uX2ZpZWxkc2V0LmRpc2FibGVkID0gZmFsc2U7XHJcbn1cclxuXHJcbi8q57uE5Lu256aB55So54q25oCBKi9cclxuZnVuY3Rpb24gaXNfZGlzYWJsZWQoKSB7XHJcbiAgcmV0dXJuIGVsX3BhZ2luYXRpb25fZmllbGRzZXQuZGlzYWJsZWQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pagination.js\n");

/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pagination = __webpack_require__(/*! ../pagination */ \"./pagination.js\");\r\n\r\npagination.init({\r\n  el: '#page',\r\n  amount: 200,\r\n  limit: 10,\r\n  range: 5,\r\n  current: 12,\r\n\r\n  on_page_change: function(page,e) {\r\n    console.log(page);\r\n  }\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90ZXN0L3Rlc3QuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXN0L3Rlc3QuanM/MzdhYyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4uL3BhZ2luYXRpb24nKTtcclxuXHJcbnBhZ2luYXRpb24uaW5pdCh7XHJcbiAgZWw6ICcjcGFnZScsXHJcbiAgYW1vdW50OiAyMDAsXHJcbiAgbGltaXQ6IDEwLFxyXG4gIHJhbmdlOiA1LFxyXG4gIGN1cnJlbnQ6IDEyLFxyXG5cclxuICBvbl9wYWdlX2NoYW5nZTogZnVuY3Rpb24ocGFnZSxlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhwYWdlKTtcclxuICB9XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./test/test.js\n");

/***/ })

/******/ });