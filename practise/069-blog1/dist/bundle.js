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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/helper */ \"./src/Util/helper.js\");\n\n\nlet instance;\n\nclass Route {\n  constructor(config) {\n    this.param = {};\n    this.load_config(config);\n\n    this.detect_click();\n    this.detect_hash_change();\n    this.go(window.location.hash, {force: true});\n  }\n\n  // 加载所有配置\n  load_config(config) {\n    this.def = {hook: {}};\n    this.config = Object.assign({},this.def, config);\n    this.load_route_config();\n  }\n\n  // 加载路由配置\n  load_route_config() {\n    let route_list = this.config.routes;\n\n    for(var route_name in route_list) {\n      let route_item = route_list[route_name];\n      let path = this.trim_hash(route_item.path);\n      let path_arr = path.split('/');\n      route_item.param = {};\n      route_item.name = route_name;\n\n      path_arr.forEach((segment, index) => {\n        let is_param = segment.startsWith(':');\n        let key = is_param ? segment.substring(1, segment.length-1): segment;\n        \n        route_item.$segment = route.$segment || {};\n        route_item.$segment[index] = {\n          name: key,\n          position: index,\n          is_param: is_param,\n        };\n      });\n    }\n  }\n\n  detect_hash_change() {\n    window.addEventListener('hashchange',() => {\n      this.go(window.location.hash);\n    });\n  }\n\n  detect_click() {\n    document.addEventListener('click', e => {\n      var target = e.target;\n\n      // 查看点击的是哪一类元素\n      switch (target.nodeName) {\n        case 'A':\n          // 如果是外站链接就停止后续操作\n          if(target.host)\n          return;\n\n          this.go(target.hash);\n          break;\n      }\n    });\n  }\n \n  /**\n   * 更改路由\n   * @param {string} hash 原始hash路径\n   * @param {Object} opt 配置项\n   */\n  go(hash, opt = null) {\n    this.hide('#not-found');\n    // 判断是否存在\n    if(this.config.hook.before)\n      // 判断是否执行\n      if(this.config.hook.before())\n        return;\n\n    hash = hash || 'home';\n\n    let def = {\n      force: false,\n    }\n\n    opt = Object.assign({}, def, opt);\n\n    let old_state = this.current;\n    let new_state = this.parse_hash(hash);\n    this.previous = old_state;\n\n    if(!new_state) {\n      if(this.config.hook.notFound)\n        this.config.hook.notFound();\n      this.render('#not-found');\n      return;\n    }\n\n    this.current = new_state;\n\n    if(!this.current.el) \n      throw new ReferenceError(`Please config route ${this.current.name} el`);\n\n    this.render();\n\n    if(this.config.hook.after)\n      this.config.hook.after(this.current);\n\n  }\n\n  hide(selector) {\n    var el = document.querySelector(selector);\n    if(!el)\n      return;\n    el.hidden = true;\n  }\n\n  render(selector) {\n    let current_page;\n    selector = selector || this.current.el;\n\n    // 隐藏所有页面\n    this.hide_all_previous();\n    current_page = document.querySelector(selector);\n\n    if(!current_page)\n      return;\n    \n      content.hidden = false;\n  }\n\n  show(selector) {\n    document.querySelector(selector).hidden = false;\n  }\n\n  hide_all_previous() {\n    if(!this.previous)\n      return;\n    document.querySelector(this.previous.el).hidden = true;\n  }\n\n  /**\n   * 通过原始hash解析页面名称\n   * @return {Object} eg: {path: '/article', param: {id:1}}\n   */\n  parse_hash(hash) {\n    hash = this.trim_hash(hash);\n    let hash_arr = hash.split('/');\n    let route_list = this.config.routes;\n\n    for(var route_name in route_list) {\n      let route_item = route_list[route_name];\n      let $segment = route_item.$segment;\n      let matched = true;\n\n      if(Object.keys($segment).length != hash_arr.length) {\n        matched = false;\n        return;\n      }\n\n      hash_arr.forEach(function(segment, index) {\n        let $segment = route.$segment[index];\n        let $name = $segment.name;\n\n        if(!$segment) {\n          matched = false;\n          return;\n        }\n\n        if($segment.is_param) {\n          route.param[$name] = segment;\n        } else {\n          if($name != segment) {\n            matched = false;\n            return;\n          }\n        }\n      });\n\n      if(matched)\n        return route;\n    }\n  }\n\n  trim_hash(hash) {\n    return _Util_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].trim(hash, '#/');\n  }\n}\n\n\n\nfunction init(config) {\n  if(!instance)\n    instance = new Route(config);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({init});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGVscGVyIGZyb20gICcuLi9VdGlsL2hlbHBlcic7XG5cbmxldCBpbnN0YW5jZTtcblxuY2xhc3MgUm91dGUge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLnBhcmFtID0ge307XG4gICAgdGhpcy5sb2FkX2NvbmZpZyhjb25maWcpO1xuXG4gICAgdGhpcy5kZXRlY3RfY2xpY2soKTtcbiAgICB0aGlzLmRldGVjdF9oYXNoX2NoYW5nZSgpO1xuICAgIHRoaXMuZ28od2luZG93LmxvY2F0aW9uLmhhc2gsIHtmb3JjZTogdHJ1ZX0pO1xuICB9XG5cbiAgLy8g5Yqg6L295omA5pyJ6YWN572uXG4gIGxvYWRfY29uZmlnKGNvbmZpZykge1xuICAgIHRoaXMuZGVmID0ge2hvb2s6IHt9fTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWYsIGNvbmZpZyk7XG4gICAgdGhpcy5sb2FkX3JvdXRlX2NvbmZpZygpO1xuICB9XG5cbiAgLy8g5Yqg6L296Lev55Sx6YWN572uXG4gIGxvYWRfcm91dGVfY29uZmlnKCkge1xuICAgIGxldCByb3V0ZV9saXN0ID0gdGhpcy5jb25maWcucm91dGVzO1xuXG4gICAgZm9yKHZhciByb3V0ZV9uYW1lIGluIHJvdXRlX2xpc3QpIHtcbiAgICAgIGxldCByb3V0ZV9pdGVtID0gcm91dGVfbGlzdFtyb3V0ZV9uYW1lXTtcbiAgICAgIGxldCBwYXRoID0gdGhpcy50cmltX2hhc2gocm91dGVfaXRlbS5wYXRoKTtcbiAgICAgIGxldCBwYXRoX2FyciA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgIHJvdXRlX2l0ZW0ucGFyYW0gPSB7fTtcbiAgICAgIHJvdXRlX2l0ZW0ubmFtZSA9IHJvdXRlX25hbWU7XG5cbiAgICAgIHBhdGhfYXJyLmZvckVhY2goKHNlZ21lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBpc19wYXJhbSA9IHNlZ21lbnQuc3RhcnRzV2l0aCgnOicpO1xuICAgICAgICBsZXQga2V5ID0gaXNfcGFyYW0gPyBzZWdtZW50LnN1YnN0cmluZygxLCBzZWdtZW50Lmxlbmd0aC0xKTogc2VnbWVudDtcbiAgICAgICAgXG4gICAgICAgIHJvdXRlX2l0ZW0uJHNlZ21lbnQgPSByb3V0ZS4kc2VnbWVudCB8fCB7fTtcbiAgICAgICAgcm91dGVfaXRlbS4kc2VnbWVudFtpbmRleF0gPSB7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHBvc2l0aW9uOiBpbmRleCxcbiAgICAgICAgICBpc19wYXJhbTogaXNfcGFyYW0sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkZXRlY3RfaGFzaF9jaGFuZ2UoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCgpID0+IHtcbiAgICAgIHRoaXMuZ28od2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIH0pO1xuICB9XG5cbiAgZGV0ZWN0X2NsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAgIC8vIOafpeeci+eCueWHu+eahOaYr+WTquS4gOexu+WFg+e0oFxuICAgICAgc3dpdGNoICh0YXJnZXQubm9kZU5hbWUpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgLy8g5aaC5p6c5piv5aSW56uZ6ZO+5o6l5bCx5YGc5q2i5ZCO57ut5pON5L2cXG4gICAgICAgICAgaWYodGFyZ2V0Lmhvc3QpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgdGhpcy5nbyh0YXJnZXQuaGFzaCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiBcbiAgLyoqXG4gICAqIOabtOaUuei3r+eUsVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaCDljp/lp4toYXNo6Lev5b6EXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHQg6YWN572u6aG5XG4gICAqL1xuICBnbyhoYXNoLCBvcHQgPSBudWxsKSB7XG4gICAgdGhpcy5oaWRlKCcjbm90LWZvdW5kJyk7XG4gICAgLy8g5Yik5pat5piv5ZCm5a2Y5ZyoXG4gICAgaWYodGhpcy5jb25maWcuaG9vay5iZWZvcmUpXG4gICAgICAvLyDliKTmlq3mmK/lkKbmiafooYxcbiAgICAgIGlmKHRoaXMuY29uZmlnLmhvb2suYmVmb3JlKCkpXG4gICAgICAgIHJldHVybjtcblxuICAgIGhhc2ggPSBoYXNoIHx8ICdob21lJztcblxuICAgIGxldCBkZWYgPSB7XG4gICAgICBmb3JjZTogZmFsc2UsXG4gICAgfVxuXG4gICAgb3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmLCBvcHQpO1xuXG4gICAgbGV0IG9sZF9zdGF0ZSA9IHRoaXMuY3VycmVudDtcbiAgICBsZXQgbmV3X3N0YXRlID0gdGhpcy5wYXJzZV9oYXNoKGhhc2gpO1xuICAgIHRoaXMucHJldmlvdXMgPSBvbGRfc3RhdGU7XG5cbiAgICBpZighbmV3X3N0YXRlKSB7XG4gICAgICBpZih0aGlzLmNvbmZpZy5ob29rLm5vdEZvdW5kKVxuICAgICAgICB0aGlzLmNvbmZpZy5ob29rLm5vdEZvdW5kKCk7XG4gICAgICB0aGlzLnJlbmRlcignI25vdC1mb3VuZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IG5ld19zdGF0ZTtcblxuICAgIGlmKCF0aGlzLmN1cnJlbnQuZWwpIFxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBQbGVhc2UgY29uZmlnIHJvdXRlICR7dGhpcy5jdXJyZW50Lm5hbWV9IGVsYCk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgaWYodGhpcy5jb25maWcuaG9vay5hZnRlcilcbiAgICAgIHRoaXMuY29uZmlnLmhvb2suYWZ0ZXIodGhpcy5jdXJyZW50KTtcblxuICB9XG5cbiAgaGlkZShzZWxlY3Rvcikge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIGlmKCFlbClcbiAgICAgIHJldHVybjtcbiAgICBlbC5oaWRkZW4gPSB0cnVlO1xuICB9XG5cbiAgcmVuZGVyKHNlbGVjdG9yKSB7XG4gICAgbGV0IGN1cnJlbnRfcGFnZTtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8IHRoaXMuY3VycmVudC5lbDtcblxuICAgIC8vIOmakOiXj+aJgOaciemhtemdolxuICAgIHRoaXMuaGlkZV9hbGxfcHJldmlvdXMoKTtcbiAgICBjdXJyZW50X3BhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmKCFjdXJyZW50X3BhZ2UpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgICBjb250ZW50LmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgc2hvdyhzZWxlY3Rvcikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmhpZGRlbiA9IGZhbHNlO1xuICB9XG5cbiAgaGlkZV9hbGxfcHJldmlvdXMoKSB7XG4gICAgaWYoIXRoaXMucHJldmlvdXMpXG4gICAgICByZXR1cm47XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnByZXZpb3VzLmVsKS5oaWRkZW4gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIOmAmui/h+WOn+Wni2hhc2jop6PmnpDpobXpnaLlkI3np7BcbiAgICogQHJldHVybiB7T2JqZWN0fSBlZzoge3BhdGg6ICcvYXJ0aWNsZScsIHBhcmFtOiB7aWQ6MX19XG4gICAqL1xuICBwYXJzZV9oYXNoKGhhc2gpIHtcbiAgICBoYXNoID0gdGhpcy50cmltX2hhc2goaGFzaCk7XG4gICAgbGV0IGhhc2hfYXJyID0gaGFzaC5zcGxpdCgnLycpO1xuICAgIGxldCByb3V0ZV9saXN0ID0gdGhpcy5jb25maWcucm91dGVzO1xuXG4gICAgZm9yKHZhciByb3V0ZV9uYW1lIGluIHJvdXRlX2xpc3QpIHtcbiAgICAgIGxldCByb3V0ZV9pdGVtID0gcm91dGVfbGlzdFtyb3V0ZV9uYW1lXTtcbiAgICAgIGxldCAkc2VnbWVudCA9IHJvdXRlX2l0ZW0uJHNlZ21lbnQ7XG4gICAgICBsZXQgbWF0Y2hlZCA9IHRydWU7XG5cbiAgICAgIGlmKE9iamVjdC5rZXlzKCRzZWdtZW50KS5sZW5ndGggIT0gaGFzaF9hcnIubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoYXNoX2Fyci5mb3JFYWNoKGZ1bmN0aW9uKHNlZ21lbnQsIGluZGV4KSB7XG4gICAgICAgIGxldCAkc2VnbWVudCA9IHJvdXRlLiRzZWdtZW50W2luZGV4XTtcbiAgICAgICAgbGV0ICRuYW1lID0gJHNlZ21lbnQubmFtZTtcblxuICAgICAgICBpZighJHNlZ21lbnQpIHtcbiAgICAgICAgICBtYXRjaGVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJHNlZ21lbnQuaXNfcGFyYW0pIHtcbiAgICAgICAgICByb3V0ZS5wYXJhbVskbmFtZV0gPSBzZWdtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKCRuYW1lICE9IHNlZ21lbnQpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZihtYXRjaGVkKVxuICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgfVxuICB9XG5cbiAgdHJpbV9oYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gaGVscGVyLnRyaW0oaGFzaCwgJyMvJyk7XG4gIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGluaXQoY29uZmlnKSB7XG4gIGlmKCFpbnN0YW5jZSlcbiAgICBpbnN0YW5jZSA9IG5ldyBSb3V0ZShjb25maWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7aW5pdH07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n// import article from './Api/article';\r\n\r\n// article.read();\r\n\r\nlet config = {\r\n    routes: {\r\n        home: {\r\n            path: '/home',\r\n            el: '#home',\r\n        },\r\n        about: {\r\n            path: '/about',\r\n            el: '#about',\r\n        },\r\n        article: {\r\n            path: '/article/:author/:id',\r\n            el: '#article',\r\n        },\r\n        article_list: {\r\n            path: '/article-list',\r\n            el: '#article-list',\r\n        },\r\n        tag: {\r\n            path: '/tag',\r\n            el: '#tag',\r\n        },\r\n    },\r\n    hook: {\r\n        before: function () {\r\n            return true;\r\n            // let he_is_admin = true;\r\n            // if (!he_is_admin)\r\n            //   return false;\r\n            // return true;\r\n        },\r\n        after: function (route) {\r\n            // route.param.yo; // undefined\r\n            // console.log('后');\r\n            // console.log('route:', route);\r\n        },\r\n    },\r\n};\r\n\r\n_Route_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(config);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgYXJ0aWNsZSBmcm9tICcuL0FwaS9hcnRpY2xlJztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xyXG4vLyBhcnRpY2xlLnJlYWQoKTtcclxuXHJcbmxldCBjb25maWcgPSB7XHJcbiAgICByb3V0ZXM6IHtcclxuICAgICAgICBob21lOiB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcvaG9tZScsXHJcbiAgICAgICAgICAgIGVsOiAnI2hvbWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWJvdXQ6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9hYm91dCcsXHJcbiAgICAgICAgICAgIGVsOiAnI2Fib3V0JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFydGljbGU6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9hcnRpY2xlLzphdXRob3IvOmlkJyxcclxuICAgICAgICAgICAgZWw6ICcjYXJ0aWNsZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcnRpY2xlX2xpc3Q6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9hcnRpY2xlLWxpc3QnLFxyXG4gICAgICAgICAgICBlbDogJyNhcnRpY2xlLWxpc3QnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFnOiB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcvdGFnJyxcclxuICAgICAgICAgICAgZWw6ICcjdGFnJyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGhvb2s6IHtcclxuICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vIGxldCBoZV9pc19hZG1pbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGlmICghaGVfaXNfYWRtaW4pXHJcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbiAocm91dGUpIHtcclxuICAgICAgICAgICAgLy8gcm91dGUucGFyYW0ueW87IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5ZCOJyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyb3V0ZTonLCByb3V0ZSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5yb3V0ZS5pbml0KGNvbmZpZyk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });