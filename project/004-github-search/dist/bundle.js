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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZXZlbnRzLmpzLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/events.js\n");

/***/ }),

/***/ "./src/history.js":
/*!************************!*\
  !*** ./src/history.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var el_list = document.getElementById('history-list')\r\n  , list\r\n;\r\n\r\n//防止LocalStorage中出现重复的历史记录\r\nfunction append(kwd) {\r\n  // 先删\r\n  find_and_delete(list, kwd);\r\n  list.unshift(kwd);\r\n  overwrite_list(list);\r\n}\r\n\r\n//重写历史列表\r\nfunction overwrite_list(data) {\r\n  store_set('list', data);\r\n}\r\n\r\nfunction show_list() {\r\n  if (!list || !list.length)\r\n    return;\r\n  el_list.hidden = false;\r\n}\r\n\r\nfunction hide_list() {\r\n  el_list.hidden = true;\r\n}\r\n\r\nfunction reload_list() {\r\n  list = store_get('list');\r\n}\r\n\r\nfunction render_list() {\r\n  el_list.innerHTML = '';\r\n  list.forEach(function(history) {\r\n    var el_delete, el_history = document.createElement('div');\r\n    el_history.classList.add('history');\r\n    el_history.dataset.history = history;\r\n    el_history.innerHTML = `\r\n      <div class=\"text\">${history}</div>\r\n      <div class=\"tool\">\r\n        <span class=\"delete\">删除</span>\r\n      </div>\r\n    `;\r\n    el_delete = el_history.querySelector('.delete');\r\n    el_list.appendChild(el_history);\r\n    el_history.addEventListener('click', function(e) {\r\n      //若点击到删除按钮直接返回(不上屏也不搜索)\r\n      if (e.target.classList.contains('delete'))\r\n        return;\r\n      //当本条历史记录被点击时将搜索框的关键词改为对应的历史关键词\r\n      set_keyword(this.dataset.history);\r\n      search();\r\n    });\r\n\r\n    el_delete.addEventListener('click', function() {\r\n      var el_history = this.closest('.history')\r\n        //当删除按钮被点击时，找到被删除的那条\r\n        ,\r\n        kwd = el_history.dataset.history;\r\n\r\n      if (find_and_delete(list, kwd)) {\r\n        overwrite_list(list);\r\n        // 重新渲染\r\n        setTimeout(function() {\r\n          render_list();\r\n        }, 0);\r\n\r\n        if (!list.length) {\r\n          el_list.hidden = true;\r\n        }\r\n      }\r\n    });\r\n  });\r\n}\r\n\r\nfunction find_and_delete(arr, element) {\r\n  var shit_index = arr.indexOf(element);\r\n  //如果删除失败 直接返回\r\n  if (shit_index == -1)\r\n    return false;\r\n\r\n  arr.splice(shit_index, 1);\r\n  return true;\r\n}\r\n\r\nfunction set_keyword(kwd) {\r\n  el_input.value = kwd;\r\n  keyword = kwd;\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGlzdG9yeS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9oaXN0b3J5LmpzPzcyNzciXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlzdG9yeS1saXN0JylcclxuICAsIGxpc3RcclxuO1xyXG5cclxuLy/pmLLmraJMb2NhbFN0b3JhZ2XkuK3lh7rnjrDph43lpI3nmoTljoblj7LorrDlvZVcclxuZnVuY3Rpb24gYXBwZW5kKGt3ZCkge1xyXG4gIC8vIOWFiOWIoFxyXG4gIGZpbmRfYW5kX2RlbGV0ZShsaXN0LCBrd2QpO1xyXG4gIGxpc3QudW5zaGlmdChrd2QpO1xyXG4gIG92ZXJ3cml0ZV9saXN0KGxpc3QpO1xyXG59XHJcblxyXG4vL+mHjeWGmeWOhuWPsuWIl+ihqFxyXG5mdW5jdGlvbiBvdmVyd3JpdGVfbGlzdChkYXRhKSB7XHJcbiAgc3RvcmVfc2V0KCdsaXN0JywgZGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dfbGlzdCgpIHtcclxuICBpZiAoIWxpc3QgfHwgIWxpc3QubGVuZ3RoKVxyXG4gICAgcmV0dXJuO1xyXG4gIGVsX2xpc3QuaGlkZGVuID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVfbGlzdCgpIHtcclxuICBlbF9saXN0LmhpZGRlbiA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbG9hZF9saXN0KCkge1xyXG4gIGxpc3QgPSBzdG9yZV9nZXQoJ2xpc3QnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyX2xpc3QoKSB7XHJcbiAgZWxfbGlzdC5pbm5lckhUTUwgPSAnJztcclxuICBsaXN0LmZvckVhY2goZnVuY3Rpb24oaGlzdG9yeSkge1xyXG4gICAgdmFyIGVsX2RlbGV0ZSwgZWxfaGlzdG9yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxfaGlzdG9yeS5jbGFzc0xpc3QuYWRkKCdoaXN0b3J5Jyk7XHJcbiAgICBlbF9oaXN0b3J5LmRhdGFzZXQuaGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgICBlbF9oaXN0b3J5LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj4ke2hpc3Rvcnl9PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b29sXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGVcIj7liKDpmaQ8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIGVsX2RlbGV0ZSA9IGVsX2hpc3RvcnkucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpO1xyXG4gICAgZWxfbGlzdC5hcHBlbmRDaGlsZChlbF9oaXN0b3J5KTtcclxuICAgIGVsX2hpc3RvcnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIC8v6Iul54K55Ye75Yiw5Yig6Zmk5oyJ6ZKu55u05o6l6L+U5ZueKOS4jeS4iuWxj+S5n+S4jeaQnOe0oilcclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlJykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAvL+W9k+acrOadoeWOhuWPsuiusOW9leiiq+eCueWHu+aXtuWwhuaQnOe0ouahhueahOWFs+mUruivjeaUueS4uuWvueW6lOeahOWOhuWPsuWFs+mUruivjVxyXG4gICAgICBzZXRfa2V5d29yZCh0aGlzLmRhdGFzZXQuaGlzdG9yeSk7XHJcbiAgICAgIHNlYXJjaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZWxfZGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBlbF9oaXN0b3J5ID0gdGhpcy5jbG9zZXN0KCcuaGlzdG9yeScpXHJcbiAgICAgICAgLy/lvZPliKDpmaTmjInpkq7ooqvngrnlh7vml7bvvIzmib7liLDooqvliKDpmaTnmoTpgqPmnaFcclxuICAgICAgICAsXHJcbiAgICAgICAga3dkID0gZWxfaGlzdG9yeS5kYXRhc2V0Lmhpc3Rvcnk7XHJcblxyXG4gICAgICBpZiAoZmluZF9hbmRfZGVsZXRlKGxpc3QsIGt3ZCkpIHtcclxuICAgICAgICBvdmVyd3JpdGVfbGlzdChsaXN0KTtcclxuICAgICAgICAvLyDph43mlrDmuLLmn5NcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVuZGVyX2xpc3QoKTtcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgZWxfbGlzdC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRfYW5kX2RlbGV0ZShhcnIsIGVsZW1lbnQpIHtcclxuICB2YXIgc2hpdF9pbmRleCA9IGFyci5pbmRleE9mKGVsZW1lbnQpO1xyXG4gIC8v5aaC5p6c5Yig6Zmk5aSx6LSlIOebtOaOpei/lOWbnlxyXG4gIGlmIChzaGl0X2luZGV4ID09IC0xKVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBhcnIuc3BsaWNlKHNoaXRfaW5kZXgsIDEpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRfa2V5d29yZChrd2QpIHtcclxuICBlbF9pbnB1dC52YWx1ZSA9IGt3ZDtcclxuICBrZXl3b3JkID0ga3dkO1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/history.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ./history */ \"./src/history.js\")\r\n  , events = __webpack_require__(/*! ./events */ \"./src/events.js\")\r\n;\r\n\r\ninit();\r\n\r\nfunction init() {\r\n  history.reload_list();\r\n  history.render_list();\r\n  events.bind_all();\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaGlzdG9yeSA9IHJlcXVpcmUoJy4vaGlzdG9yeScpXHJcbiAgLCBldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpXHJcbjtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgaGlzdG9yeS5yZWxvYWRfbGlzdCgpO1xyXG4gIGhpc3RvcnkucmVuZGVyX2xpc3QoKTtcclxuICBldmVudHMuYmluZF9hbGwoKTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });