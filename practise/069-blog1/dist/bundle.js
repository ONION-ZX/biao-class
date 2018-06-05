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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/send */ \"./src/Util/send.js\");\n\n\nlet instance;\n\nfunction init() {\n  if(!instance)\n    instance = new Article();\n  return instance;\n}\n\nclass Article {\n  read(page, on_succeed, on_fail) {\n    _Util_send__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/api/article/read',on_succeed, on_fail);\n  }\n}\n\ninit();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQXBpL2FydGljbGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBpL2FydGljbGUuanM/MGU0OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VuZCBmcm9tICcuLi9VdGlsL3NlbmQnO1xuXG5sZXQgaW5zdGFuY2U7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGlmKCFpbnN0YW5jZSlcbiAgICBpbnN0YW5jZSA9IG5ldyBBcnRpY2xlKCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuY2xhc3MgQXJ0aWNsZSB7XG4gIHJlYWQocGFnZSwgb25fc3VjY2VlZCwgb25fZmFpbCkge1xuICAgIHNlbmQuZ2V0KCcvYXBpL2FydGljbGUvcmVhZCcsb25fc3VjY2VlZCwgb25fZmFpbCk7XG4gIH1cbn1cblxuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Api/article.js\n");

/***/ }),

/***/ "./src/Route/route.js":
/*!****************************!*\
  !*** ./src/Route/route.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/helper */ \"./src/Util/helper.js\");\n\n\nlet instance;\n\nclass Route {\n  constructor(config) {\n    this.param = {};\n    this.load_config(config);\n\n    this.detect_click();\n    this.detect_hash_change();\n    this.go(window.location.hash, {force: true});\n  }\n\n  load_config(config) {\n    this.def = {hook: {}};\n    this.config = Object.assign({}, this.def, config);\n    this.load_route_config();\n  }\n\n  load_route_config() {\n    let route_list = this.config.routes;\n\n    for(var name in route_list) {\n      let route = route_list[name];\n      let path = this.trim_hash(route.path);\n      let path_arr = path.split('/');\n      route.param = {};\n      route.name = name;\n\n      path_arr.forEach((segment, index) => {\n        let is_param = segment.startsWith(':');\n        let key = is_param ? segment.substring(1, segment.length) : segment;\n        route.$segment = route.$segment || {};\n        route.$segment[index] = {\n          name: key,\n          position: index,\n          is_param: is_param,\n        };\n      });\n    }\n    console.log(this.config);\n  }\n\n  detect_hash_change() {\n    window.addEventListener('hashchange', () => {\n      /*如果发生改变就去对应页面*/\n      this.go(window.location.hash);\n    });\n  }\n\n  detect_click() {\n    document.addEventListener('click', e => {\n      var target = e.target;\n\n      /*看看点击的是哪类元素*/\n      switch (target.nodeName) {\n        /*如果是<a>元素*/\n        case 'A':\n          /*如果是外站链接就停止后续操作*/\n          if (target.host)\n            return;\n\n          /*去对应地址*/\n          this.go(target.hash);\n          break;\n      }\n    });\n  }\n\n  go(hash, opt = null) {\n    this.hide('#not-found');\n\n    if(this.config.hook.before)\n      if(!this.config.hook.before())\n        return;\n\n    hash = hash || 'home';\n\n    let def = {\n      force: false,\n    };\n\n    opt = Object.assign({}, def, opt);\n\n    let old_state = this.current;\n    let new_state = this.parse_hash(hash);\n    this.previous = old_state;\n\n    if(!new_state) {\n      if(this.config.hook.notFound)\n        this.config.hook.notFound();\n      this.render('#not-found');\n      return;\n    }\n\n    this.current = new_state;\n\n    console.log(this.current);\n\n    if(!this.current.el)\n      throw new ReferenceError(`Please config route ${this.current.name} el`);\n\n    this.render();\n\n    if(this.config.hook.after)\n      this.config.hook.after(this.current);\n  }\n\n  hide(el) {\n    var el = document.querySelector(el);\n    if (!el)\n      return;\n    el.hidden = true;\n  }\n\n  render(selector) {\n    var content;\n    selector = selector || this.current.el;\n\n    /*先隐藏所有页面*/\n    this.hide_previous();\n\n    /*选中当前页面*/\n    content = document.querySelector(selector);\n\n    if (!content)\n      return;\n\n    content.hidden = false;\n  }\n\n  show(el) {\n    /*显示当前页面*/\n    document.querySelector(el).hidden = false;\n  }\n\n  /**\n   * 隐藏所有页面\n   * */\n  hide_previous() {\n    if (!this.previous)\n      return;\n\n    document.querySelector(this.previous.el).hidden = true;\n  }\n\n  parse_hash(hash) {\n    hash = this.trim_hash(hash);\n    let hash_arr = hash.split('/');\n    let routes = this.config.routes;\n\n    for(var name in routes) {\n      let route = routes[name];\n      let $segment = route.$segment;\n      let matched = true;\n\n      if (Object.keys($segment).length != hash_arr.length) {\n        matched = false;\n        //进行下一次循环\n        continue;\n      }\n\n      hash_arr.forEach((segment, index) => {\n        let $segment = route.$segment[index];\n        let $name = $segment.name;\n\n        if(!$segment) {\n          matched = false;\n          return;\n        } \n\n        //如果为参数\n        if($segment.is_param) {\n          route.param[$name] = segment;\n        } else if($name != segment) {\n          matched = false;\n          return;\n        }\n      });\n\n      if(matched)\n        return route;\n    }\n  }\n\n  trim_hash(hash) {\n    return _Util_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].trim(hash, '#/');\n  }\n\n}\n\nfunction init(config) {\n  if(!instance)\n    instance = new Route(config);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({init});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGVscGVyIGZyb20gJy4uL1V0aWwvaGVscGVyJztcblxubGV0IGluc3RhbmNlO1xuXG5jbGFzcyBSb3V0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMucGFyYW0gPSB7fTtcbiAgICB0aGlzLmxvYWRfY29uZmlnKGNvbmZpZyk7XG5cbiAgICB0aGlzLmRldGVjdF9jbGljaygpO1xuICAgIHRoaXMuZGV0ZWN0X2hhc2hfY2hhbmdlKCk7XG4gICAgdGhpcy5nbyh3aW5kb3cubG9jYXRpb24uaGFzaCwge2ZvcmNlOiB0cnVlfSk7XG4gIH1cblxuICBsb2FkX2NvbmZpZyhjb25maWcpIHtcbiAgICB0aGlzLmRlZiA9IHtob29rOiB7fX07XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZiwgY29uZmlnKTtcbiAgICB0aGlzLmxvYWRfcm91dGVfY29uZmlnKCk7XG4gIH1cblxuICBsb2FkX3JvdXRlX2NvbmZpZygpIHtcbiAgICBsZXQgcm91dGVfbGlzdCA9IHRoaXMuY29uZmlnLnJvdXRlcztcblxuICAgIGZvcih2YXIgbmFtZSBpbiByb3V0ZV9saXN0KSB7XG4gICAgICBsZXQgcm91dGUgPSByb3V0ZV9saXN0W25hbWVdO1xuICAgICAgbGV0IHBhdGggPSB0aGlzLnRyaW1faGFzaChyb3V0ZS5wYXRoKTtcbiAgICAgIGxldCBwYXRoX2FyciA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgIHJvdXRlLnBhcmFtID0ge307XG4gICAgICByb3V0ZS5uYW1lID0gbmFtZTtcblxuICAgICAgcGF0aF9hcnIuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IGlzX3BhcmFtID0gc2VnbWVudC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgICAgIGxldCBrZXkgPSBpc19wYXJhbSA/IHNlZ21lbnQuc3Vic3RyaW5nKDEsIHNlZ21lbnQubGVuZ3RoKSA6IHNlZ21lbnQ7XG4gICAgICAgIHJvdXRlLiRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnQgfHwge307XG4gICAgICAgIHJvdXRlLiRzZWdtZW50W2luZGV4XSA9IHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgcG9zaXRpb246IGluZGV4LFxuICAgICAgICAgIGlzX3BhcmFtOiBpc19wYXJhbSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBkZXRlY3RfaGFzaF9jaGFuZ2UoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAvKuWmguaenOWPkeeUn+aUueWPmOWwseWOu+WvueW6lOmhtemdoiovXG4gICAgICB0aGlzLmdvKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRldGVjdF9jbGljaygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgICAvKueci+eci+eCueWHu+eahOaYr+WTquexu+WFg+e0oCovXG4gICAgICBzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZSkge1xuICAgICAgICAvKuWmguaenOaYrzxhPuWFg+e0oCovXG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIC8q5aaC5p6c5piv5aSW56uZ6ZO+5o6l5bCx5YGc5q2i5ZCO57ut5pON5L2cKi9cbiAgICAgICAgICBpZiAodGFyZ2V0Lmhvc3QpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAvKuWOu+WvueW6lOWcsOWdgCovXG4gICAgICAgICAgdGhpcy5nbyh0YXJnZXQuaGFzaCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnbyhoYXNoLCBvcHQgPSBudWxsKSB7XG4gICAgdGhpcy5oaWRlKCcjbm90LWZvdW5kJyk7XG5cbiAgICBpZih0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSlcbiAgICAgIGlmKCF0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSgpKVxuICAgICAgICByZXR1cm47XG5cbiAgICBoYXNoID0gaGFzaCB8fCAnaG9tZSc7XG5cbiAgICBsZXQgZGVmID0ge1xuICAgICAgZm9yY2U6IGZhbHNlLFxuICAgIH07XG5cbiAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWYsIG9wdCk7XG5cbiAgICBsZXQgb2xkX3N0YXRlID0gdGhpcy5jdXJyZW50O1xuICAgIGxldCBuZXdfc3RhdGUgPSB0aGlzLnBhcnNlX2hhc2goaGFzaCk7XG4gICAgdGhpcy5wcmV2aW91cyA9IG9sZF9zdGF0ZTtcblxuICAgIGlmKCFuZXdfc3RhdGUpIHtcbiAgICAgIGlmKHRoaXMuY29uZmlnLmhvb2subm90Rm91bmQpXG4gICAgICAgIHRoaXMuY29uZmlnLmhvb2subm90Rm91bmQoKTtcbiAgICAgIHRoaXMucmVuZGVyKCcjbm90LWZvdW5kJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gbmV3X3N0YXRlO1xuXG4gICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50KTtcblxuICAgIGlmKCF0aGlzLmN1cnJlbnQuZWwpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYFBsZWFzZSBjb25maWcgcm91dGUgJHt0aGlzLmN1cnJlbnQubmFtZX0gZWxgKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICBpZih0aGlzLmNvbmZpZy5ob29rLmFmdGVyKVxuICAgICAgdGhpcy5jb25maWcuaG9vay5hZnRlcih0aGlzLmN1cnJlbnQpO1xuICB9XG5cbiAgaGlkZShlbCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGlmICghZWwpXG4gICAgICByZXR1cm47XG4gICAgZWwuaGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcihzZWxlY3Rvcikge1xuICAgIHZhciBjb250ZW50O1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5jdXJyZW50LmVsO1xuXG4gICAgLyrlhYjpmpDol4/miYDmnInpobXpnaIqL1xuICAgIHRoaXMuaGlkZV9wcmV2aW91cygpO1xuXG4gICAgLyrpgInkuK3lvZPliY3pobXpnaIqL1xuICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmICghY29udGVudClcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnRlbnQuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBzaG93KGVsKSB7XG4gICAgLyrmmL7npLrlvZPliY3pobXpnaIqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOmakOiXj+aJgOaciemhtemdolxuICAgKiAqL1xuICBoaWRlX3ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91cylcbiAgICAgIHJldHVybjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wcmV2aW91cy5lbCkuaGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHBhcnNlX2hhc2goaGFzaCkge1xuICAgIGhhc2ggPSB0aGlzLnRyaW1faGFzaChoYXNoKTtcbiAgICBsZXQgaGFzaF9hcnIgPSBoYXNoLnNwbGl0KCcvJyk7XG4gICAgbGV0IHJvdXRlcyA9IHRoaXMuY29uZmlnLnJvdXRlcztcblxuICAgIGZvcih2YXIgbmFtZSBpbiByb3V0ZXMpIHtcbiAgICAgIGxldCByb3V0ZSA9IHJvdXRlc1tuYW1lXTtcbiAgICAgIGxldCAkc2VnbWVudCA9IHJvdXRlLiRzZWdtZW50O1xuICAgICAgbGV0IG1hdGNoZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoJHNlZ21lbnQpLmxlbmd0aCAhPSBoYXNoX2Fyci5sZW5ndGgpIHtcbiAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAvL+i/m+ihjOS4i+S4gOasoeW+queOr1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaGFzaF9hcnIuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0ICRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnRbaW5kZXhdO1xuICAgICAgICBsZXQgJG5hbWUgPSAkc2VnbWVudC5uYW1lO1xuXG4gICAgICAgIGlmKCEkc2VnbWVudCkge1xuICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG5cbiAgICAgICAgLy/lpoLmnpzkuLrlj4LmlbBcbiAgICAgICAgaWYoJHNlZ21lbnQuaXNfcGFyYW0pIHtcbiAgICAgICAgICByb3V0ZS5wYXJhbVskbmFtZV0gPSBzZWdtZW50O1xuICAgICAgICB9IGVsc2UgaWYoJG5hbWUgIT0gc2VnbWVudCkge1xuICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZihtYXRjaGVkKVxuICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgfVxuICB9XG5cbiAgdHJpbV9oYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gaGVscGVyLnRyaW0oaGFzaCwgJyMvJyk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBpbml0KGNvbmZpZykge1xuICBpZighaW5zdGFuY2UpXG4gICAgaW5zdGFuY2UgPSBuZXcgUm91dGUoY29uZmlnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2luaXR9OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

/***/ }),

/***/ "./src/Ui/article.js":
/*!***************************!*\
  !*** ./src/Ui/article.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet instance;\r\n\r\nfunction init() {\r\n    if (!instance)\r\n        instance = new Article();\r\n    return instance;\r\n}\r\n\r\nclass Article {\r\n    constructor() {\r\n        this.el = document.querySelector('#article-list .list');\r\n    }\r\n    render(data){\r\n        this.el.innerHTML = '';\r\n        data.forEach((row, index) => {\r\n            let el_article = document.createElement('div');\r\n            el_article.innerHTML = `\r\n                <h3>${row.title}</h3>\r\n                <div>${row.content}</div>\r\n            `;\r\n            this.el.appendChild(el_article);\r\n        });\r\n    }\r\n}\r\n\r\ninit();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVWkvYXJ0aWNsZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VaS9hcnRpY2xlLmpzP2U0MzgiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGluc3RhbmNlO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGlmICghaW5zdGFuY2UpXHJcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgQXJ0aWNsZSgpO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG59XHJcblxyXG5jbGFzcyBBcnRpY2xlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXJ0aWNsZS1saXN0IC5saXN0Jyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoZGF0YSl7XHJcbiAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBkYXRhLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsX2FydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZWxfYXJ0aWNsZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aDM+JHtyb3cudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxkaXY+JHtyb3cuY29udGVudH08L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChlbF9hcnRpY2xlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuaW5pdCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Ui/article.js\n");

/***/ }),

/***/ "./src/Util/helper.js":
/*!****************************!*\
  !*** ./src/Util/helper.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst output = {\r\n    trim: trim,\r\n};\r\n\r\nfunction trim(str, cap_list) {\r\n    let arr = cap_list.split('');\r\n\r\n    arr.forEach(function (cap) {\r\n        if (str.startsWith(cap)) {\r\n            str = str.substring(1);\r\n            str = trim(str, cap);\r\n        }\r\n\r\n        if (str.endsWith(cap)) {\r\n            str = str.substring(0, str.length - 1);\r\n            str = trim(str, cap);\r\n        }\r\n    });\r\n\r\n    return str;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (output);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbC9oZWxwZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVXRpbC9oZWxwZXIuanM/YzVhMiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBvdXRwdXQgPSB7XHJcbiAgICB0cmltOiB0cmltLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gdHJpbShzdHIsIGNhcF9saXN0KSB7XHJcbiAgICBsZXQgYXJyID0gY2FwX2xpc3Quc3BsaXQoJycpO1xyXG5cclxuICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChjYXApIHtcclxuICAgICAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoY2FwKSkge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBzdHIgPSB0cmltKHN0ciwgY2FwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHIuZW5kc1dpdGgoY2FwKSkge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgc3RyID0gdHJpbShzdHIsIGNhcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Util/helper.js\n");

/***/ }),

/***/ "./src/Util/send.js":
/*!**************************!*\
  !*** ./src/Util/send.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ok = true;\nconst data = {\n  list: {\n    article: [\n      {\n        'id': 1,\n        'title': '叫我王花花',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n      {\n        'id': 2,\n        'title': '叫我李栓蛋',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n      {\n        'id': 3,\n        'title': '叫我刘贝贝',\n        'content': 'Lorem ipsum dolor sit amet, consect'\n      },\n    ],\n    tag: [\n      {\n        'id': 1,\n        'name': 'HTML',\n      },\n      {\n        'id': 2,\n        'name': '生活',\n      },\n      {\n        'id': 3,\n        'name': 'CSS',\n      },\n    ],\n  },\n}\n\nconst get = (url, on_succeed, on_fail) => {\n  let model = url.split('/')[2];\n\n  if(ok)\n    if(on_succeed)\n      on_succeed(data.list[model]);\n    else {\n      if(on_fail)\n        on_fail({\n          ok: false,\n          message: 'invalid page',\n        });\n    }\n}\n\nconst output = {\n  get,\n  // post,\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (output);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbC9zZW5kLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwvc2VuZC5qcz9jNGU5Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9rID0gdHJ1ZTtcbmNvbnN0IGRhdGEgPSB7XG4gIGxpc3Q6IHtcbiAgICBhcnRpY2xlOiBbXG4gICAgICB7XG4gICAgICAgICdpZCc6IDEsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHnjovoirHoirEnLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdpZCc6IDIsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHmnY7moJPom4snLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdpZCc6IDMsXG4gICAgICAgICd0aXRsZSc6ICflj6vmiJHliJjotJ3otJ0nLFxuICAgICAgICAnY29udGVudCc6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdCdcbiAgICAgIH0sXG4gICAgXSxcbiAgICB0YWc6IFtcbiAgICAgIHtcbiAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgJ25hbWUnOiAnSFRNTCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnaWQnOiAyLFxuICAgICAgICAnbmFtZSc6ICfnlJ/mtLsnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2lkJzogMyxcbiAgICAgICAgJ25hbWUnOiAnQ1NTJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn1cblxuY29uc3QgZ2V0ID0gKHVybCwgb25fc3VjY2VlZCwgb25fZmFpbCkgPT4ge1xuICBsZXQgbW9kZWwgPSB1cmwuc3BsaXQoJy8nKVsyXTtcblxuICBpZihvaylcbiAgICBpZihvbl9zdWNjZWVkKVxuICAgICAgb25fc3VjY2VlZChkYXRhLmxpc3RbbW9kZWxdKTtcbiAgICBlbHNlIHtcbiAgICAgIGlmKG9uX2ZhaWwpXG4gICAgICAgIG9uX2ZhaWwoe1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiAnaW52YWxpZCBwYWdlJyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBvdXRwdXQgPSB7XG4gIGdldCxcbiAgLy8gcG9zdCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Util/send.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Api_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Api/article */ \"./src/Api/article.js\");\n/* harmony import */ var _Ui_article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ui/article */ \"./src/Ui/article.js\");\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n\r\n\r\n// import send from './Util/send';\r\n\r\n\r\nlet config = {\r\n    routes: {\r\n        home: {\r\n            path: '/home',\r\n            el: '#home',\r\n        },\r\n        about: {\r\n            path: '/about',\r\n            el: '#about',\r\n        },\r\n        article: {\r\n            path: '/article/:author/:id', // ['article', ':author', ':id']\r\n            el: '#article',\r\n        },\r\n        article_list: {\r\n            path: '/article-list',\r\n            el: '#article-list',\r\n        },\r\n        tag: {\r\n            path: '/tag',\r\n            el: '#tag',\r\n        },\r\n    },\r\n    hook: {\r\n        before: function () {\r\n            //还没摸到数据 一般用于查看权限\r\n            return true;\r\n            // let he_is_admin = true;\r\n            // if (!he_is_admin)\r\n            //   return false;\r\n            // return true;\r\n        },\r\n        after: function (route) {\r\n            // 通过接口拿数据\r\n            _Api_article__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read(1,(data) => {\r\n                // 动态渲染内容\r\n                _Ui_article__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(data);\r\n            });\r\n        },\r\n    },\r\n};\r\n\r\n_Route_route__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(config);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXJ0aWNsZV9hcGkgZnJvbSAnLi9BcGkvYXJ0aWNsZSc7XHJcbmltcG9ydCBhcnRpY2xlX3VpIGZyb20gJy4vVWkvYXJ0aWNsZSc7XHJcbi8vIGltcG9ydCBzZW5kIGZyb20gJy4vVXRpbC9zZW5kJztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xyXG5cclxubGV0IGNvbmZpZyA9IHtcclxuICAgIHJvdXRlczoge1xyXG4gICAgICAgIGhvbWU6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9ob21lJyxcclxuICAgICAgICAgICAgZWw6ICcjaG9tZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhYm91dDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgICAgICAgZWw6ICcjYWJvdXQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJ0aWNsZToge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUvOmF1dGhvci86aWQnLCAvLyBbJ2FydGljbGUnLCAnOmF1dGhvcicsICc6aWQnXVxyXG4gICAgICAgICAgICBlbDogJyNhcnRpY2xlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFydGljbGVfbGlzdDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgICAgIGVsOiAnI2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWc6IHtcclxuICAgICAgICAgICAgcGF0aDogJy90YWcnLFxyXG4gICAgICAgICAgICBlbDogJyN0YWcnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgaG9vazoge1xyXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+i/mOayoeaRuOWIsOaVsOaNriDkuIDoiKznlKjkuo7mn6XnnIvmnYPpmZBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vIGxldCBoZV9pc19hZG1pbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGlmICghaGVfaXNfYWRtaW4pXHJcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbiAocm91dGUpIHtcclxuICAgICAgICAgICAgLy8g6YCa6L+H5o6l5Y+j5ou/5pWw5o2uXHJcbiAgICAgICAgICAgIGFydGljbGVfYXBpLnJlYWQoMSwoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yqo5oCB5riy5p+T5YaF5a65XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlX3VpLnJlbmRlcihkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5yb3V0ZS5pbml0KGNvbmZpZyk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });