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

/***/ "./src/Route/route.js":
/*!****************************!*\
  !*** ./src/Route/route.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/helper */ \"./src/Util/helper.js\");\n\n\nlet instance;\n\nclass Route {\n  constructor(config) {\n    this.param = {};\n    this.load_config(config);\n\n    this.detect_click();\n    this.detect_hash_change();\n    this.go(window.location.hash, {force: true});\n  }\n\n  load_config(config) {\n    this.def = {hook: {}};\n    this.config = Object.assign({}, this.def, config);\n    this.load_route_config();\n  }\n\n  load_route_config() {\n    let route_list = this.config.routes;\n\n    for(var name in route_list) {\n      let route = route_list[name];\n      let path = this.trim_hash(route.path);\n      let path_arr = path.split('/');\n      route.param = {};\n      route.name = name;\n\n      path_arr.forEach((segment, index) => {\n        let is_param = segment.startsWith(':');\n        let key = is_param ? segment.substring(1, segment.length) : segment;\n        route.$segment = route.$segment || {};\n        route.$segment[index] = {\n          name: key,\n          position: index,\n          is_param: is_param,\n        };\n      });\n    }\n    console.log(this.config);\n  }\n\n  detect_hash_change() {\n    window.addEventListener('hashchange', () => {\n      /*如果发生改变就去对应页面*/\n      this.go(window.location.hash);\n    });\n  }\n\n  detect_click() {\n    document.addEventListener('click', e => {\n      var target = e.target;\n\n      /*看看点击的是哪类元素*/\n      switch (target.nodeName) {\n        /*如果是<a>元素*/\n        case 'A':\n          /*如果是外站链接就停止后续操作*/\n          if (target.host)\n            return;\n\n          /*去对应地址*/\n          this.go(target.hash);\n          break;\n      }\n    });\n  }\n\n  go(hash, opt = null) {\n    this.hide('#not-found');\n\n    if(this.config.hook.before)\n      if(!this.config.hook.before())\n        return;\n\n    hash = hash || 'home';\n\n    let def = {\n      force: false,\n    };\n\n    opt = Object.assign({}, def, opt);\n\n    let old_state = this.current;\n    let new_state = this.parse_hash(hash);\n    this.previous = old_state;\n\n    if(!new_state) {\n      if(this.config.hook.notFound)\n        this.config.hook.notFound();\n      this.render('#not-found');\n      return;\n    }\n\n    this.current = new_state;\n\n    console.log(this.current);\n\n    if(!this.current.el)\n      throw new ReferenceError(`Please config route ${this.current.name} el`);\n\n    this.render();\n\n    if(this.config.hook.after)\n      this.config.hook.after(this.current);\n  }\n\n  hide(el) {\n    var el = document.querySelector(el);\n    if (!el)\n      return;\n    el.hidden = true;\n  }\n\n  render(selector) {\n    var content;\n    selector = selector || this.current.el;\n\n    /*先隐藏所有页面*/\n    this.hide_previous();\n\n    /*选中当前页面*/\n    content = document.querySelector(selector);\n\n    if (!content)\n      return;\n\n    content.hidden = false;\n  }\n\n  show(el) {\n    /*显示当前页面*/\n    document.querySelector(el).hidden = false;\n  }\n\n  /**\n   * 隐藏所有页面\n   * */\n  hide_previous() {\n    if (!this.previous)\n      return;\n\n    document.querySelector(this.previous.el).hidden = true;\n  }\n\n  parse_hash(hash) {\n    hash = this.trim_hash(hash);\n    let hash_arr = hash.split('/');\n    let routes = this.config.routes;\n\n    for(var name in routes) {\n      let route = routes[name];\n      let $segment = route.$segment;\n      let matched = true;\n\n      if (Object.keys($segment).length != hash_arr.length) {\n        matched = false;\n        continue;\n      }\n\n      hash_arr.forEach((segment, index) => {\n        let $segment = route.$segment[index];\n        let $name = $segment.name;\n\n        if(!$segment) {\n          matched = false;\n          return;\n        } \n\n        if($segment.is_param) {\n          route.param[$name] = segment\n        } \n        \n        else if($name != segment) {\n          matched = false;\n          return;\n        }\n      });\n\n      if(matched)\n        return route;\n    }\n  }\n\n  trim_hash(hash) {\n    return _Util_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].trim(hash, '#/');\n  }\n\n}\n\nfunction init(config) {\n  if(!instance)\n    instance = new Route(config);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({init});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGVscGVyIGZyb20gJy4uL1V0aWwvaGVscGVyJztcblxubGV0IGluc3RhbmNlO1xuXG5jbGFzcyBSb3V0ZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMucGFyYW0gPSB7fTtcbiAgICB0aGlzLmxvYWRfY29uZmlnKGNvbmZpZyk7XG5cbiAgICB0aGlzLmRldGVjdF9jbGljaygpO1xuICAgIHRoaXMuZGV0ZWN0X2hhc2hfY2hhbmdlKCk7XG4gICAgdGhpcy5nbyh3aW5kb3cubG9jYXRpb24uaGFzaCwge2ZvcmNlOiB0cnVlfSk7XG4gIH1cblxuICBsb2FkX2NvbmZpZyhjb25maWcpIHtcbiAgICB0aGlzLmRlZiA9IHtob29rOiB7fX07XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZiwgY29uZmlnKTtcbiAgICB0aGlzLmxvYWRfcm91dGVfY29uZmlnKCk7XG4gIH1cblxuICBsb2FkX3JvdXRlX2NvbmZpZygpIHtcbiAgICBsZXQgcm91dGVfbGlzdCA9IHRoaXMuY29uZmlnLnJvdXRlcztcblxuICAgIGZvcih2YXIgbmFtZSBpbiByb3V0ZV9saXN0KSB7XG4gICAgICBsZXQgcm91dGUgPSByb3V0ZV9saXN0W25hbWVdO1xuICAgICAgbGV0IHBhdGggPSB0aGlzLnRyaW1faGFzaChyb3V0ZS5wYXRoKTtcbiAgICAgIGxldCBwYXRoX2FyciA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgIHJvdXRlLnBhcmFtID0ge307XG4gICAgICByb3V0ZS5uYW1lID0gbmFtZTtcblxuICAgICAgcGF0aF9hcnIuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IGlzX3BhcmFtID0gc2VnbWVudC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgICAgIGxldCBrZXkgPSBpc19wYXJhbSA/IHNlZ21lbnQuc3Vic3RyaW5nKDEsIHNlZ21lbnQubGVuZ3RoKSA6IHNlZ21lbnQ7XG4gICAgICAgIHJvdXRlLiRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnQgfHwge307XG4gICAgICAgIHJvdXRlLiRzZWdtZW50W2luZGV4XSA9IHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgcG9zaXRpb246IGluZGV4LFxuICAgICAgICAgIGlzX3BhcmFtOiBpc19wYXJhbSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBkZXRlY3RfaGFzaF9jaGFuZ2UoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAvKuWmguaenOWPkeeUn+aUueWPmOWwseWOu+WvueW6lOmhtemdoiovXG4gICAgICB0aGlzLmdvKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRldGVjdF9jbGljaygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgICAvKueci+eci+eCueWHu+eahOaYr+WTquexu+WFg+e0oCovXG4gICAgICBzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZSkge1xuICAgICAgICAvKuWmguaenOaYrzxhPuWFg+e0oCovXG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIC8q5aaC5p6c5piv5aSW56uZ6ZO+5o6l5bCx5YGc5q2i5ZCO57ut5pON5L2cKi9cbiAgICAgICAgICBpZiAodGFyZ2V0Lmhvc3QpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAvKuWOu+WvueW6lOWcsOWdgCovXG4gICAgICAgICAgdGhpcy5nbyh0YXJnZXQuaGFzaCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnbyhoYXNoLCBvcHQgPSBudWxsKSB7XG4gICAgdGhpcy5oaWRlKCcjbm90LWZvdW5kJyk7XG5cbiAgICBpZih0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSlcbiAgICAgIGlmKCF0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSgpKVxuICAgICAgICByZXR1cm47XG5cbiAgICBoYXNoID0gaGFzaCB8fCAnaG9tZSc7XG5cbiAgICBsZXQgZGVmID0ge1xuICAgICAgZm9yY2U6IGZhbHNlLFxuICAgIH07XG5cbiAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWYsIG9wdCk7XG5cbiAgICBsZXQgb2xkX3N0YXRlID0gdGhpcy5jdXJyZW50O1xuICAgIGxldCBuZXdfc3RhdGUgPSB0aGlzLnBhcnNlX2hhc2goaGFzaCk7XG4gICAgdGhpcy5wcmV2aW91cyA9IG9sZF9zdGF0ZTtcblxuICAgIGlmKCFuZXdfc3RhdGUpIHtcbiAgICAgIGlmKHRoaXMuY29uZmlnLmhvb2subm90Rm91bmQpXG4gICAgICAgIHRoaXMuY29uZmlnLmhvb2subm90Rm91bmQoKTtcbiAgICAgIHRoaXMucmVuZGVyKCcjbm90LWZvdW5kJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gbmV3X3N0YXRlO1xuXG4gICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50KTtcblxuICAgIGlmKCF0aGlzLmN1cnJlbnQuZWwpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYFBsZWFzZSBjb25maWcgcm91dGUgJHt0aGlzLmN1cnJlbnQubmFtZX0gZWxgKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICBpZih0aGlzLmNvbmZpZy5ob29rLmFmdGVyKVxuICAgICAgdGhpcy5jb25maWcuaG9vay5hZnRlcih0aGlzLmN1cnJlbnQpO1xuICB9XG5cbiAgaGlkZShlbCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGlmICghZWwpXG4gICAgICByZXR1cm47XG4gICAgZWwuaGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcihzZWxlY3Rvcikge1xuICAgIHZhciBjb250ZW50O1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5jdXJyZW50LmVsO1xuXG4gICAgLyrlhYjpmpDol4/miYDmnInpobXpnaIqL1xuICAgIHRoaXMuaGlkZV9wcmV2aW91cygpO1xuXG4gICAgLyrpgInkuK3lvZPliY3pobXpnaIqL1xuICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmICghY29udGVudClcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnRlbnQuaGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBzaG93KGVsKSB7XG4gICAgLyrmmL7npLrlvZPliY3pobXpnaIqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOmakOiXj+aJgOaciemhtemdolxuICAgKiAqL1xuICBoaWRlX3ByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91cylcbiAgICAgIHJldHVybjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wcmV2aW91cy5lbCkuaGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHBhcnNlX2hhc2goaGFzaCkge1xuICAgIGhhc2ggPSB0aGlzLnRyaW1faGFzaChoYXNoKTtcbiAgICBsZXQgaGFzaF9hcnIgPSBoYXNoLnNwbGl0KCcvJyk7XG4gICAgbGV0IHJvdXRlcyA9IHRoaXMuY29uZmlnLnJvdXRlcztcblxuICAgIGZvcih2YXIgbmFtZSBpbiByb3V0ZXMpIHtcbiAgICAgIGxldCByb3V0ZSA9IHJvdXRlc1tuYW1lXTtcbiAgICAgIGxldCAkc2VnbWVudCA9IHJvdXRlLiRzZWdtZW50O1xuICAgICAgbGV0IG1hdGNoZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoJHNlZ21lbnQpLmxlbmd0aCAhPSBoYXNoX2Fyci5sZW5ndGgpIHtcbiAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaGFzaF9hcnIuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0ICRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnRbaW5kZXhdO1xuICAgICAgICBsZXQgJG5hbWUgPSAkc2VnbWVudC5uYW1lO1xuXG4gICAgICAgIGlmKCEkc2VnbWVudCkge1xuICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYoJHNlZ21lbnQuaXNfcGFyYW0pIHtcbiAgICAgICAgICByb3V0ZS5wYXJhbVskbmFtZV0gPSBzZWdtZW50XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBlbHNlIGlmKCRuYW1lICE9IHNlZ21lbnQpIHtcbiAgICAgICAgICBtYXRjaGVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYobWF0Y2hlZClcbiAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgIH1cbiAgfVxuXG4gIHRyaW1faGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIGhlbHBlci50cmltKGhhc2gsICcjLycpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gaW5pdChjb25maWcpIHtcbiAgaWYoIWluc3RhbmNlKVxuICAgIGluc3RhbmNlID0gbmV3IFJvdXRlKGNvbmZpZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpbml0fTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n// import article from './Api/article';\r\n\r\n\r\nlet config = {\r\n    routes: {\r\n        home: {\r\n            path: '/home',\r\n            el: '#home',\r\n        },\r\n        about: {\r\n            path: '/about',\r\n            el: '#about',\r\n        },\r\n        article: {\r\n            path: '/article/:author/:id', // ['article', ':author', ':id']\r\n            el: '#article',\r\n        },\r\n        article_list: {\r\n            path: '/article-list',\r\n            el: '#article-list',\r\n        },\r\n        tag: {\r\n            path: '/tag',\r\n            el: '#tag',\r\n        },\r\n    },\r\n    hook: {\r\n        before: function () {\r\n            return true;\r\n            // let he_is_admin = true;\r\n            // if (!he_is_admin)\r\n            //   return false;\r\n            // return true;\r\n        },\r\n        after: function (route) {\r\n            // route.param.yo; // undefined\r\n            // console.log('后');\r\n            // console.log('route:', route);\r\n        },\r\n    },\r\n};\r\n\r\n_Route_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n    .init(config);\r\n\r\n// article.read();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgYXJ0aWNsZSBmcm9tICcuL0FwaS9hcnRpY2xlJztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xyXG5cclxubGV0IGNvbmZpZyA9IHtcclxuICAgIHJvdXRlczoge1xyXG4gICAgICAgIGhvbWU6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9ob21lJyxcclxuICAgICAgICAgICAgZWw6ICcjaG9tZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhYm91dDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgICAgICAgZWw6ICcjYWJvdXQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJ0aWNsZToge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUvOmF1dGhvci86aWQnLCAvLyBbJ2FydGljbGUnLCAnOmF1dGhvcicsICc6aWQnXVxyXG4gICAgICAgICAgICBlbDogJyNhcnRpY2xlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFydGljbGVfbGlzdDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgICAgIGVsOiAnI2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWc6IHtcclxuICAgICAgICAgICAgcGF0aDogJy90YWcnLFxyXG4gICAgICAgICAgICBlbDogJyN0YWcnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgaG9vazoge1xyXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gbGV0IGhlX2lzX2FkbWluID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gaWYgKCFoZV9pc19hZG1pbilcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uIChyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyByb3V0ZS5wYXJhbS55bzsgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCflkI4nKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3JvdXRlOicsIHJvdXRlKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbnJvdXRlXHJcbiAgICAuaW5pdChjb25maWcpO1xyXG5cclxuLy8gYXJ0aWNsZS5yZWFkKCk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });