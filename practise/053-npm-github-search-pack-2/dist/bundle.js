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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/element.js":
/*!***********************!*\
  !*** ./js/element.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var form = document.getElementById('search-form')\r\n  , input = document.getElementById('search-input')\r\n  , user_list = document.getElementById('user-list')\r\n  , next = document.getElementById('next')\r\n  , top = document.getElementById('top')\r\n;\r\n\r\nfunction hide_next() {\r\n  next.hidden = true;\r\n}\r\n\r\nfunction show_next() {\r\n  next.hidden = false;\r\n}\r\n\r\nfunction render_user_list(data) {\r\n  var html = user_list.innerHTML;\r\n  data.forEach(function(user) {\r\n    html = html +　`\r\n      <div class=\"user\">\r\n        <a class=\"avatar\" target = \"_blank\" href = \"${user.html_url}\"}>\r\n          <img src = \"${user.avatar_url}\">\r\n        </a>\r\n        <div class=\"info\">\r\n          <div class=\"username\">${user.login}</div>\r\n          <div><a target = \"_blank\" href = \"${user.html_url}\">${user.html_url}</a></div>\r\n        </div>\r\n      </div>\r\n    `;\r\n  });\r\n  user_list.innerHTML = html;\r\n}\r\n\r\nmodule.exports = {\r\n  show_next: show_next,\r\n  hide_next: hide_next,\r\n  form: form,\r\n  input: input,\r\n  next: next,\r\n  top: top,\r\n  render_user_list: render_user_list,\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9lbGVtZW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZWxlbWVudC5qcz8yODZkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1mb3JtJylcclxuICAsIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpXHJcbiAgLCB1c2VyX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1saXN0JylcclxuICAsIG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpXHJcbiAgLCB0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wJylcclxuO1xyXG5cclxuZnVuY3Rpb24gaGlkZV9uZXh0KCkge1xyXG4gIG5leHQuaGlkZGVuID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19uZXh0KCkge1xyXG4gIG5leHQuaGlkZGVuID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlcl91c2VyX2xpc3QoZGF0YSkge1xyXG4gIHZhciBodG1sID0gdXNlcl9saXN0LmlubmVySFRNTDtcclxuICBkYXRhLmZvckVhY2goZnVuY3Rpb24odXNlcikge1xyXG4gICAgaHRtbCA9IGh0bWwgK+OAgGBcclxuICAgICAgPGRpdiBjbGFzcz1cInVzZXJcIj5cclxuICAgICAgICA8YSBjbGFzcz1cImF2YXRhclwiIHRhcmdldCA9IFwiX2JsYW5rXCIgaHJlZiA9IFwiJHt1c2VyLmh0bWxfdXJsfVwifT5cclxuICAgICAgICAgIDxpbWcgc3JjID0gXCIke3VzZXIuYXZhdGFyX3VybH1cIj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VybmFtZVwiPiR7dXNlci5sb2dpbn08L2Rpdj5cclxuICAgICAgICAgIDxkaXY+PGEgdGFyZ2V0ID0gXCJfYmxhbmtcIiBocmVmID0gXCIke3VzZXIuaHRtbF91cmx9XCI+JHt1c2VyLmh0bWxfdXJsfTwvYT48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH0pO1xyXG4gIHVzZXJfbGlzdC5pbm5lckhUTUwgPSBodG1sO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaG93X25leHQ6IHNob3dfbmV4dCxcclxuICBoaWRlX25leHQ6IGhpZGVfbmV4dCxcclxuICBmb3JtOiBmb3JtLFxyXG4gIGlucHV0OiBpbnB1dCxcclxuICBuZXh0OiBuZXh0LFxyXG4gIHRvcDogdG9wLFxyXG4gIHJlbmRlcl91c2VyX2xpc3Q6IHJlbmRlcl91c2VyX2xpc3QsXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/element.js\n");

/***/ }),

/***/ "./js/event.js":
/*!*********************!*\
  !*** ./js/event.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var el = __webpack_require__(/*! ./element */ \"./js/element.js\")\r\n  , search = __webpack_require__(/*! ./search */ \"./js/search.js\")\r\n  , page = 1\r\n  , limit = 5\r\n  , keyword\r\n;\r\n\r\nfunction detect_next_page() {\r\n  el.next.addEventListener('click',function() {\r\n    var config = {\r\n      page: ++page,\r\n      limit: limit,\r\n    }\r\n    search.user(keyword, function(data) {\r\n      el.render_user_list(data.items);\r\n    },config);\r\n  });\r\n}\r\n\r\nfunction detect_submit() {\r\n  el.form.addEventListener('submit',function(e) {\r\n    e.preventDefault();\r\n    keyword = el.input.value;\r\n    search.user(keyword,function(data) {\r\n      el.render_user_list(data.items);\r\n    });\r\n  });\r\n}\r\n\r\nfunction click_to_top() {\r\n  el.top.addEventListener('click',function() {\r\n    window.scrollTo(0,0);\r\n  });\r\n}\r\n\r\nfunction add_events() {\r\n  detect_submit();\r\n  click_to_top();\r\n  detect_next_page();\r\n}\r\n\r\nmodule.exports = {\r\n  detect_next_page: detect_next_page,\r\n  add_events: add_events,\r\n  detect_submit: detect_submit,\r\n  click_to_top: click_to_top,\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9ldmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2V2ZW50LmpzPzY4Y2EiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsID0gcmVxdWlyZSgnLi9lbGVtZW50JylcclxuICAsIHNlYXJjaCA9IHJlcXVpcmUoJy4vc2VhcmNoJylcclxuICAsIHBhZ2UgPSAxXHJcbiAgLCBsaW1pdCA9IDVcclxuICAsIGtleXdvcmRcclxuO1xyXG5cclxuZnVuY3Rpb24gZGV0ZWN0X25leHRfcGFnZSgpIHtcclxuICBlbC5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb25maWcgPSB7XHJcbiAgICAgIHBhZ2U6ICsrcGFnZSxcclxuICAgICAgbGltaXQ6IGxpbWl0LFxyXG4gICAgfVxyXG4gICAgc2VhcmNoLnVzZXIoa2V5d29yZCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICBlbC5yZW5kZXJfdXNlcl9saXN0KGRhdGEuaXRlbXMpO1xyXG4gICAgfSxjb25maWcpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3Rfc3VibWl0KCkge1xyXG4gIGVsLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBrZXl3b3JkID0gZWwuaW5wdXQudmFsdWU7XHJcbiAgICBzZWFyY2gudXNlcihrZXl3b3JkLGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgZWwucmVuZGVyX3VzZXJfbGlzdChkYXRhLml0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGlja190b190b3AoKSB7XHJcbiAgZWwudG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfZXZlbnRzKCkge1xyXG4gIGRldGVjdF9zdWJtaXQoKTtcclxuICBjbGlja190b190b3AoKTtcclxuICBkZXRlY3RfbmV4dF9wYWdlKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGRldGVjdF9uZXh0X3BhZ2U6IGRldGVjdF9uZXh0X3BhZ2UsXHJcbiAgYWRkX2V2ZW50czogYWRkX2V2ZW50cyxcclxuICBkZXRlY3Rfc3VibWl0OiBkZXRlY3Rfc3VibWl0LFxyXG4gIGNsaWNrX3RvX3RvcDogY2xpY2tfdG9fdG9wLFxyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/event.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ele = __webpack_require__(/*! ./event */ \"./js/event.js\");\r\n\r\ninit();\r\n\r\nfunction init() {\r\n  ele.add_events();\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsZSA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgZWxlLmFkZF9ldmVudHMoKTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function user(keyword,on_success,config) {\r\n  var def = {\r\n    page : 1,\r\n    limit: 5,\r\n    keyword: 'yo'\r\n  }\r\n\r\n  config = Object.assign({},def,config);\r\n\r\n  var http = new XMLHttpRequest();\r\n  http.open('get','https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);\r\n  http.send();\r\n\r\n  http.addEventListener('load',function(){\r\n    var data = JSON.parse(this.responseText);\r\n    on_success(data);\r\n  });\r\n}\r\n\r\nmodule.exports = {\r\n  user: user,\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZWFyY2guanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2guanM/ODAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB1c2VyKGtleXdvcmQsb25fc3VjY2Vzcyxjb25maWcpIHtcclxuICB2YXIgZGVmID0ge1xyXG4gICAgcGFnZSA6IDEsXHJcbiAgICBsaW1pdDogNSxcclxuICAgIGtleXdvcmQ6ICd5bydcclxuICB9XHJcblxyXG4gIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sZGVmLGNvbmZpZyk7XHJcblxyXG4gIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgaHR0cC5vcGVuKCdnZXQnLCdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC91c2Vycz9xPScgKyBrZXl3b3JkICsgJyZwYWdlPScgKyBjb25maWcucGFnZSArICcmcGVyX3BhZ2U9JyArIGNvbmZpZy5saW1pdCk7XHJcbiAgaHR0cC5zZW5kKCk7XHJcblxyXG4gIGh0dHAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICBvbl9zdWNjZXNzKGRhdGEpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB1c2VyOiB1c2VyLFxyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/search.js\n");

/***/ })

/******/ });