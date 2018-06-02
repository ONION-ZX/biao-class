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

/***/ "./src/Api/article.js":
/*!****************************!*\
  !*** ./src/Api/article.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/send */ \"./src/Util/send.js\");\n\n\nlet instance;\n\nfunction init() {\n  if(!instance)\n    instance = new Article();\n  return instance;\n}\n\nclass Article {\n  read(page) {\n    _Util_send__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/api/article/read', data => {\n      console.log(data);\n    });\n  }\n}\n\ninit();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQXBpL2FydGljbGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBpL2FydGljbGUuanM/MGU0OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VuZCBmcm9tICcuLi9VdGlsL3NlbmQnO1xuXG5sZXQgaW5zdGFuY2U7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGlmKCFpbnN0YW5jZSlcbiAgICBpbnN0YW5jZSA9IG5ldyBBcnRpY2xlKCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuY2xhc3MgQXJ0aWNsZSB7XG4gIHJlYWQocGFnZSkge1xuICAgIHNlbmQuZ2V0KCcvYXBpL2FydGljbGUvcmVhZCcsIGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cblxuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Api/article.js\n");

/***/ }),

/***/ "./src/Route/route.js":
/*!****************************!*\
  !*** ./src/Route/route.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet instance;\r\nclass Route {\r\n  constructor() {\r\n    this.current = this.parse_hash(window.location.hash) || 'home';\r\n    this.page_list = document.querySelectorAll('.page');\r\n    this.detect_click();\r\n    this.detect_hash_change();\r\n    this.render();\r\n  }\r\n\r\n  detect_hash_change() {\r\n    window.addEventListener('hashchange', () => {\r\n      this.go(window.location.hash);\r\n    });\r\n  }\r\n\r\n  detect_click() {\r\n    document.addEventListener('click', e => {\r\n      let target = e.target;\r\n      switch (target.nodeName) {\r\n        case 'A':\r\n          if(target.host)\r\n            return;\r\n\r\n          this.go(target.href);\r\n          break;\r\n      }\r\n    });\r\n  }\r\n\r\n  go(hash) {\r\n    let old_state = this.current;\r\n    let new_state = this.parse_hash(hash);\r\n\r\n    if(old_state === new_state)\r\n      return;\r\n    this.current = new_state;\r\n    this.render();\r\n  }\r\n\r\n  render(path) {\r\n    let content;\r\n    path = path || this.current;\r\n\r\n    this.hide_all();\r\n\r\n    content = document.getElementById(path);\r\n\r\n    content.hidden = false;\r\n  }\r\n\r\n  hide_all() {\r\n    this.page_list.forEach(el => {\r\n      el.hidden = true;\r\n    });\r\n  }\r\n\r\n  parse_hash(hash) {\r\n    var hash_arr = hash.split('/');\r\n    return hash_arr[hash_arr.length - 1];\r\n  }\r\n}\r\n\r\nfunction init() {\r\n  if(!instance)\r\n    instance = new Route();\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  init,\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaW5zdGFuY2U7XHJcbmNsYXNzIFJvdXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMucGFyc2VfaGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCkgfHwgJ2hvbWUnO1xyXG4gICAgdGhpcy5wYWdlX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZScpO1xyXG4gICAgdGhpcy5kZXRlY3RfY2xpY2soKTtcclxuICAgIHRoaXMuZGV0ZWN0X2hhc2hfY2hhbmdlKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZGV0ZWN0X2hhc2hfY2hhbmdlKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ28od2luZG93LmxvY2F0aW9uLmhhc2gpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZXRlY3RfY2xpY2soKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAnQSc6XHJcbiAgICAgICAgICBpZih0YXJnZXQuaG9zdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIHRoaXMuZ28odGFyZ2V0LmhyZWYpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ28oaGFzaCkge1xyXG4gICAgbGV0IG9sZF9zdGF0ZSA9IHRoaXMuY3VycmVudDtcclxuICAgIGxldCBuZXdfc3RhdGUgPSB0aGlzLnBhcnNlX2hhc2goaGFzaCk7XHJcblxyXG4gICAgaWYob2xkX3N0YXRlID09PSBuZXdfc3RhdGUpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuY3VycmVudCA9IG5ld19zdGF0ZTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIocGF0aCkge1xyXG4gICAgbGV0IGNvbnRlbnQ7XHJcbiAgICBwYXRoID0gcGF0aCB8fCB0aGlzLmN1cnJlbnQ7XHJcblxyXG4gICAgdGhpcy5oaWRlX2FsbCgpO1xyXG5cclxuICAgIGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXRoKTtcclxuXHJcbiAgICBjb250ZW50LmhpZGRlbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaGlkZV9hbGwoKSB7XHJcbiAgICB0aGlzLnBhZ2VfbGlzdC5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuaGlkZGVuID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VfaGFzaChoYXNoKSB7XHJcbiAgICB2YXIgaGFzaF9hcnIgPSBoYXNoLnNwbGl0KCcvJyk7XHJcbiAgICByZXR1cm4gaGFzaF9hcnJbaGFzaF9hcnIubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIGlmKCFpbnN0YW5jZSlcclxuICAgIGluc3RhbmNlID0gbmV3IFJvdXRlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

/***/ }),

/***/ "./src/Util/send.js":
/*!**************************!*\
  !*** ./src/Util/send.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ok = true;\nconst data = {\n  list: {\n    article: [\n      {\n        'id': 1,\n        'title': '叫我王花花',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n      {\n        'id': 2,\n        'title': '叫我李栓蛋',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n      {\n        'id': 3,\n        'title': '叫我刘贝贝',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n    ],\n    tag: [\n      {\n        'id': 1,\n        'name': 'HTML',\n      },\n      {\n        'id': 2,\n        'name': '生活',\n      },\n      {\n        'id': 3,\n        'name': 'CSS',\n      },\n    ],\n  },\n}\n\nconst get = (url, succeed, error) => {\n  let model = url.split('/')[2];\n\n  if(ok)\n    if(succeed)\n      succeed(data.list[model]);\n    else {\n      if(error)\n        error({\n          ok: false,\n          message: 'invalid page',\n        });\n    }\n}\n\nconst output = {\n  get,\n  // post,\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (output);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbC9zZW5kLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwvc2VuZC5qcz9jNGU5Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9rID0gdHJ1ZTtcbmNvbnN0IGRhdGEgPSB7XG4gIGxpc3Q6IHtcbiAgICBhcnRpY2xlOiBbXG4gICAgICB7XG4gICAgICAgICdpZCc6IDEsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHnjovoirHoirEnLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdpZCc6IDIsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHmnY7moJPom4snLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdpZCc6IDMsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHliJjotJ3otJ0nLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgXSxcbiAgICB0YWc6IFtcbiAgICAgIHtcbiAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgJ25hbWUnOiAnSFRNTCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnaWQnOiAyLFxuICAgICAgICAnbmFtZSc6ICfnlJ/mtLsnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2lkJzogMyxcbiAgICAgICAgJ25hbWUnOiAnQ1NTJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn1cblxuY29uc3QgZ2V0ID0gKHVybCwgc3VjY2VlZCwgZXJyb3IpID0+IHtcbiAgbGV0IG1vZGVsID0gdXJsLnNwbGl0KCcvJylbMl07XG5cbiAgaWYob2spXG4gICAgaWYoc3VjY2VlZClcbiAgICAgIHN1Y2NlZWQoZGF0YS5saXN0W21vZGVsXSk7XG4gICAgZWxzZSB7XG4gICAgICBpZihlcnJvcilcbiAgICAgICAgZXJyb3Ioe1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiAnaW52YWxpZCBwYWdlJyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBvdXRwdXQgPSB7XG4gIGdldCxcbiAgLy8gcG9zdCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Util/send.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Api_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Api/article */ \"./src/Api/article.js\");\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n\r\n\r\n_Api_article__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read();\r\n_Route_route__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXJ0aWNsZSBmcm9tICcuL0FwaS9hcnRpY2xlJztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xyXG5hcnRpY2xlLnJlYWQoKTtcclxucm91dGUuaW5pdCgpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });