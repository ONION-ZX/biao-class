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
eval("__webpack_require__.r(__webpack_exports__);\nlet instance;\n\nclass Route {\n  constructor() {\n    this.current = this.parse_hash(window.location.hash) || 'home';\n    this.page_list = document.querySelectorAll('.page');\n    this.detect_click();\n    this.detect_hash_change();\n    this.render();\n  }\n\n  detect_hash_change() {\n    window.addEventListener('hashchange', () => {\n      this.go(window.location.hash);\n    });\n  }\n\n  detect_click() {\n    document.addEventListener('click',e => {\n      let target = e.target;\n      switch (target.nodeName) {\n        case 'A':\n          if(target.host)\n            return;\n\n          this.go(target.href);\n          break;\n      }\n    });\n  }\n\n  go(hash) {\n    let old_state = this.current;\n    let new_state = this.parse_hash(hash);\n\n    if(old_state === new_state)\n      return;\n\n    this.current = new_state;\n    this.render();\n  }\n\n  parse_hash(hash) {\n    let hash_arr = hash.split('/');\n    return hash_arr[hash_arr.length - 1];\n  }\n\n  render(page) {\n    let content;\n    page = page || this.current;\n    this.hide_all();\n    content = document.getElementById(page);\n    content.hidden = false;\n  }\n\n  hide_all() {\n    this.page_list.forEach(page => {\n      page.hidden = true;\n    });\n  }\n\n}\n\nconst init = () => {\n  if(!instance)\n    instance = new Route();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init,\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaW5zdGFuY2U7XG5cbmNsYXNzIFJvdXRlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wYXJzZV9oYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB8fCAnaG9tZSc7XG4gICAgdGhpcy5wYWdlX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFnZScpO1xuICAgIHRoaXMuZGV0ZWN0X2NsaWNrKCk7XG4gICAgdGhpcy5kZXRlY3RfaGFzaF9jaGFuZ2UoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZGV0ZWN0X2hhc2hfY2hhbmdlKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5nbyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXRlY3RfY2xpY2soKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGUgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgc3dpdGNoICh0YXJnZXQubm9kZU5hbWUpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgaWYodGFyZ2V0Lmhvc3QpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICB0aGlzLmdvKHRhcmdldC5ocmVmKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdvKGhhc2gpIHtcbiAgICBsZXQgb2xkX3N0YXRlID0gdGhpcy5jdXJyZW50O1xuICAgIGxldCBuZXdfc3RhdGUgPSB0aGlzLnBhcnNlX2hhc2goaGFzaCk7XG5cbiAgICBpZihvbGRfc3RhdGUgPT09IG5ld19zdGF0ZSlcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMuY3VycmVudCA9IG5ld19zdGF0ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcGFyc2VfaGFzaChoYXNoKSB7XG4gICAgbGV0IGhhc2hfYXJyID0gaGFzaC5zcGxpdCgnLycpO1xuICAgIHJldHVybiBoYXNoX2FycltoYXNoX2Fyci5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIHJlbmRlcihwYWdlKSB7XG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgcGFnZSA9IHBhZ2UgfHwgdGhpcy5jdXJyZW50O1xuICAgIHRoaXMuaGlkZV9hbGwoKTtcbiAgICBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFnZSk7XG4gICAgY29udGVudC5oaWRkZW4gPSBmYWxzZTtcbiAgfVxuXG4gIGhpZGVfYWxsKCkge1xuICAgIHRoaXMucGFnZV9saXN0LmZvckVhY2gocGFnZSA9PiB7XG4gICAgICBwYWdlLmhpZGRlbiA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxufVxuXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICBpZighaW5zdGFuY2UpXG4gICAgaW5zdGFuY2UgPSBuZXcgUm91dGUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

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