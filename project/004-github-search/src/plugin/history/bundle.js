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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../util/helper.js":
/*!***************************************************************************!*\
  !*** C:/Users/周璇/biao-class/project/004-github-search/src/util/helper.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function find_and_delete(arr, element) {\r\n  var shit_index = arr.indexOf(element);\r\n\r\n  if (shit_index == -1)\r\n    return false;\r\n\r\n  arr.splice(shit_index, 1);\r\n  return true;\r\n}\r\n\r\nmodule.exports = {\r\n  find_and_delete: find_and_delete\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vdXRpbC9oZWxwZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovVXNlcnMv5ZGo55KHL2JpYW8tY2xhc3MvcHJvamVjdC8wMDQtZ2l0aHViLXNlYXJjaC9zcmMvdXRpbC9oZWxwZXIuanM/YTQzMCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kX2FuZF9kZWxldGUoYXJyLCBlbGVtZW50KSB7XHJcbiAgdmFyIHNoaXRfaW5kZXggPSBhcnIuaW5kZXhPZihlbGVtZW50KTtcclxuXHJcbiAgaWYgKHNoaXRfaW5kZXggPT0gLTEpXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGFyci5zcGxpY2Uoc2hpdF9pbmRleCwgMSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGZpbmRfYW5kX2RlbGV0ZTogZmluZF9hbmRfZGVsZXRlXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../../util/helper.js\n");

/***/ }),

/***/ "../../util/store.js":
/*!**************************************************************************!*\
  !*** C:/Users/周璇/biao-class/project/004-github-search/src/util/store.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*往冰箱存*/\r\nfunction set(key, val) {\r\n  /*加保鲜膜（JSON化）*/\r\n  var json = JSON.stringify(val);\r\n  /*存冰箱（状态稳定不轻易改变）*/\r\n  localStorage.setItem(key, json);\r\n}\r\n\r\n/*从冰箱取*/\r\nfunction get(key) {\r\n  /*从冰箱取到带保鲜膜的数据*/\r\n  var json = localStorage.getItem(key);\r\n  /*撕膜（将数据转化为JS可以理解的数据类型）*/\r\n  return JSON.parse(json);\r\n}\r\n\r\nmodule.exports = {\r\n  set: set,\r\n  get: get,\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vdXRpbC9zdG9yZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9DOi9Vc2Vycy/lkajnkocvYmlhby1jbGFzcy9wcm9qZWN0LzAwNC1naXRodWItc2VhcmNoL3NyYy91dGlsL3N0b3JlLmpzPzQ0Y2EiXSwic291cmNlc0NvbnRlbnQiOlsiLyrlvoDlhrDnrrHlrZgqL1xyXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWwpIHtcclxuICAvKuWKoOS/nemynOiGnO+8iEpTT07ljJbvvIkqL1xyXG4gIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcclxuICAvKuWtmOWGsOeuse+8iOeKtuaAgeeos+WumuS4jei9u+aYk+aUueWPmO+8iSovXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBqc29uKTtcclxufVxyXG5cclxuLyrku47lhrDnrrHlj5YqL1xyXG5mdW5jdGlvbiBnZXQoa2V5KSB7XHJcbiAgLyrku47lhrDnrrHlj5bliLDluKbkv53pspzohpznmoTmlbDmja4qL1xyXG4gIHZhciBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAvKuaSleiGnO+8iOWwhuaVsOaNrui9rOWMluS4ukpT5Y+v5Lul55CG6Kej55qE5pWw5o2u57G75Z6L77yJKi9cclxuICByZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2V0OiBzZXQsXHJcbiAgZ2V0OiBnZXQsXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../util/store.js\n");

/***/ }),

/***/ "./history.js":
/*!********************!*\
  !*** ./history.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var helper = __webpack_require__(/*! ../../util/helper */ \"../../util/helper.js\")\r\n  , store = __webpack_require__(/*! ../../util/store */ \"../../util/store.js\")\r\n;\r\n\r\nvar list = []\r\n  , el\r\n  , on_click\r\n  , on_delete\r\n;\r\n\r\n\r\nvar output = {\r\n  init: init,\r\n  add: add,\r\n  remove: remove,\r\n  clear: clear,\r\n}\r\n\r\nfunction init(config) {\r\n  el = document.querySelector(config.el);\r\n  on_click = config.on_click;\r\n  on_delete = config.on_delete;\r\n\r\n  if(!config.el || !el)\r\n  throw 'Invalid root element';\r\n\r\n  sync_to_ladle();//拿到上一次的数据\r\n  render();\r\n}\r\n\r\n// 数据操作\r\n\r\n\r\nfunction sync_to_store() {\r\n  store.set('history_list',list);\r\n}\r\n\r\nfunction sync_to_ladle() {\r\n  list = store.get('history_list') || [];\r\n}\r\n\r\nfunction add(keyword) {\r\n  helper.find_and_delete(list,keyword);\r\n  list.unshift(keyword);\r\n  sync_to_store();\r\n  render();\r\n}\r\n\r\nfunction remove(keyword) {\r\n  helper.find_and_delete(list,keyword);\r\n  sync_to_store();\r\n  render();\r\n}\r\n\r\nfunction clear() {\r\n  list = [];\r\n  sync_to_store();\r\n  render();\r\n}\r\n\r\n// UI操作\r\nfunction render() {\r\n  el.innerHTML = '';\r\n\r\n  list.forEach(function(keyword) {\r\n    var el_keyword = document.createElement('div');\r\n      el_keyword.innerHTML = `\r\n      <div class=\"text\">${keyword}</div>\r\n      <div class=\"tool\">\r\n        <span class=\"delete\">删除</span>\r\n      </div>`;\r\n\r\n    el_keyword.classList.add('history');\r\n\r\n    el.appendChild(el_keyword);\r\n\r\n    el_keyword.addEventListener('click',function(e) {\r\n\r\n      if(on_click)\r\n          on_click(keyword,e);\r\n    });\r\n\r\n    el_keyword.querySelector('.delete').addEventListener('click',function(e) {\r\n      if(on_delete)\r\n        on_delete(keyword,e);\r\n\r\n      remove(keyword);\r\n    });\r\n  });\r\n}\r\n\r\n\r\nmodule.exports = output;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9oaXN0b3J5LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaGlzdG9yeS5qcz80ODZhIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoZWxwZXIgPSByZXF1aXJlKCcuLi8uLi91dGlsL2hlbHBlcicpXHJcbiAgLCBzdG9yZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvc3RvcmUnKVxyXG47XHJcblxyXG52YXIgbGlzdCA9IFtdXHJcbiAgLCBlbFxyXG4gICwgb25fY2xpY2tcclxuICAsIG9uX2RlbGV0ZVxyXG47XHJcblxyXG5cclxudmFyIG91dHB1dCA9IHtcclxuICBpbml0OiBpbml0LFxyXG4gIGFkZDogYWRkLFxyXG4gIHJlbW92ZTogcmVtb3ZlLFxyXG4gIGNsZWFyOiBjbGVhcixcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdChjb25maWcpIHtcclxuICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLmVsKTtcclxuICBvbl9jbGljayA9IGNvbmZpZy5vbl9jbGljaztcclxuICBvbl9kZWxldGUgPSBjb25maWcub25fZGVsZXRlO1xyXG5cclxuICBpZighY29uZmlnLmVsIHx8ICFlbClcclxuICB0aHJvdyAnSW52YWxpZCByb290IGVsZW1lbnQnO1xyXG5cclxuICBzeW5jX3RvX2xhZGxlKCk7Ly/mi7/liLDkuIrkuIDmrKHnmoTmlbDmja5cclxuICByZW5kZXIoKTtcclxufVxyXG5cclxuLy8g5pWw5o2u5pON5L2cXHJcblxyXG5cclxuZnVuY3Rpb24gc3luY190b19zdG9yZSgpIHtcclxuICBzdG9yZS5zZXQoJ2hpc3RvcnlfbGlzdCcsbGlzdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfdG9fbGFkbGUoKSB7XHJcbiAgbGlzdCA9IHN0b3JlLmdldCgnaGlzdG9yeV9saXN0JykgfHwgW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZChrZXl3b3JkKSB7XHJcbiAgaGVscGVyLmZpbmRfYW5kX2RlbGV0ZShsaXN0LGtleXdvcmQpO1xyXG4gIGxpc3QudW5zaGlmdChrZXl3b3JkKTtcclxuICBzeW5jX3RvX3N0b3JlKCk7XHJcbiAgcmVuZGVyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZShrZXl3b3JkKSB7XHJcbiAgaGVscGVyLmZpbmRfYW5kX2RlbGV0ZShsaXN0LGtleXdvcmQpO1xyXG4gIHN5bmNfdG9fc3RvcmUoKTtcclxuICByZW5kZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgbGlzdCA9IFtdO1xyXG4gIHN5bmNfdG9fc3RvcmUoKTtcclxuICByZW5kZXIoKTtcclxufVxyXG5cclxuLy8gVUnmk43kvZxcclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIGVsLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICBsaXN0LmZvckVhY2goZnVuY3Rpb24oa2V5d29yZCkge1xyXG4gICAgdmFyIGVsX2tleXdvcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgZWxfa2V5d29yZC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+JHtrZXl3b3JkfTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlXCI+5Yig6ZmkPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5gO1xyXG5cclxuICAgIGVsX2tleXdvcmQuY2xhc3NMaXN0LmFkZCgnaGlzdG9yeScpO1xyXG5cclxuICAgIGVsLmFwcGVuZENoaWxkKGVsX2tleXdvcmQpO1xyXG5cclxuICAgIGVsX2tleXdvcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgIGlmKG9uX2NsaWNrKVxyXG4gICAgICAgICAgb25fY2xpY2soa2V5d29yZCxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGVsX2tleXdvcmQucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmKG9uX2RlbGV0ZSlcclxuICAgICAgICBvbl9kZWxldGUoa2V5d29yZCxlKTtcclxuXHJcbiAgICAgIHJlbW92ZShrZXl3b3JkKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBvdXRwdXQ7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./history.js\n");

/***/ }),

/***/ "./test.js":
/*!*****************!*\
  !*** ./test.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ./history */ \"./history.js\");\r\n\r\nhistory.init = {\r\n  el: '#history-list',\r\n  on_click: function(kwd,e) {\r\n    //可以是用户想要执行的任何操作\r\n    console.log(kwd,e.altKey);\r\n  },\r\n  on_delete: function(kwd,e) {\r\n    e.stopPropagation();\r\n    //可以是用户想要执行的任何操作\r\n    console.log(kwd);\r\n  }\r\n}\r\n\r\nhistory.add('yo1');\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90ZXN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdGVzdC5qcz9kNjA2Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBoaXN0b3J5ID0gcmVxdWlyZSgnLi9oaXN0b3J5Jyk7XHJcblxyXG5oaXN0b3J5LmluaXQgPSB7XHJcbiAgZWw6ICcjaGlzdG9yeS1saXN0JyxcclxuICBvbl9jbGljazogZnVuY3Rpb24oa3dkLGUpIHtcclxuICAgIC8v5Y+v5Lul5piv55So5oi35oOz6KaB5omn6KGM55qE5Lu75L2V5pON5L2cXHJcbiAgICBjb25zb2xlLmxvZyhrd2QsZS5hbHRLZXkpO1xyXG4gIH0sXHJcbiAgb25fZGVsZXRlOiBmdW5jdGlvbihrd2QsZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIC8v5Y+v5Lul5piv55So5oi35oOz6KaB5omn6KGM55qE5Lu75L2V5pON5L2cXHJcbiAgICBjb25zb2xlLmxvZyhrd2QpO1xyXG4gIH1cclxufVxyXG5cclxuaGlzdG9yeS5hZGQoJ3lvMScpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./test.js\n");

/***/ })

/******/ });