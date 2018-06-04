import helper from  '../Util/helper';

let instance;

class Route {
  constructor(config) {
    this.param = {};
    this.load_config(config);

    this.detect_click();
    this.detect_hash_change();
    this.go(window.location.hash, {force: true});
  }

  // 加载所有配置
  load_config(config) {
    this.def = {hook: {}};
    this.config = Object.assign({},this.def, config);
    this.load_route_config();
  }

  // 加载路由配置
  load_route_config() {
    let route_list = this.config.routes;

    for(var route_name in route_list) {
      let route_item = route_list[route_name];
      let path = this.trim_hash(route_item.path);
      let path_arr = path.split('/');
      route_item.param = {};
      route_item.name = route_name;

      path_arr.forEach((segment, index) => {
        let is_param = segment.startsWith(':');
        let key = is_param ? segment.substring(1, segment.length-1): segment;
        
        route_item.$segment = route.$segment || {};
        route_item.$segment[index] = {
          name: key,
          position: index,
          is_param: is_param,
        };
      });
    }
  }

  detect_hash_change() {
    window.addEventListener('hashchange',() => {
      this.go(window.location.hash);
    });
  }

  detect_click() {
    document.addEventListener('click', e => {
      var target = e.target;

      // 查看点击的是哪一类元素
      switch (target.nodeName) {
        case 'A':
          // 如果是外站链接就停止后续操作
          if(target.host)
          return;

          this.go(target.hash);
          break;
      }
    });
  }
 
  /**
   * 更改路由
   * @param {string} hash 原始hash路径
   * @param {Object} opt 配置项
   */
  go(hash, opt = null) {
    this.hide('#not-found');
    if(this.config.hook.before)
      this.config.hook.before(this.current);

    hash = hash || 'home';

    let def = {
      force: false,
    }

    opt = Object.assign({}, def, opt);

    let old_state = this.current;
    let new_state = this.parse_hash(hash);
    this.previous = old_state;

    if(!new_state) {
      if(this.config.hook.notFound)
        this.config.hook.notFound();
      this.render('#not-found');
      return;
    }

    this.current = new_state;

    if(!this.current.el) 
      throw new ReferenceError(`Please config route ${this.current.name} el`);

    this.render();

    if(this.config.hook.after)
      this.config.hook.after(this.current);

  }

  hide(selector) {
    var el = document.querySelector(selector);
    if(!el)
      return;
    el.hidden = true;
  }

  render(selector) {
    let current_page;
    selector = selector || this.current.el;

    // 隐藏所有页面
    this.hide_all_previous();
    current_page = document.querySelector(selector);

    if(!current_page)
      return;
    
      content.hidden = false;
  }

  show(selector) {
    document.querySelector(selector).hidden = false;
  }

  hide_all_previous() {
    if(!this.previous)
      return;
    document.querySelector(this.previous.el).hidden = true;
  }

  /**
   * 通过原始hash解析页面名称
   * @return {Object} eg: {path: '/article', param: {id:1}}
   */
  parse_hash(hash) {
    hash = this.trim_hash(hash);
    let hash_arr = hash.split('/');
    let route_list = this.config.routes;

    for(var route_name in route_list) {
      let route_item = route_list[route_name];
      let $segment = route_item.$segment;
      let matched = true;

      if(Object.keys($segment).length != hash_arr.length) {
        matched = false;
        return;
      }

      hash_arr.forEach(function(segment, index) {
        let $segment = route.$segment[index];
        let $name = $segment.name;

        if(!$segment) {
          matched = false;
          return;
        }

        if($segment.is_param) {
          route.param[$name] = segment;
        } else {
          if($name != segment) {
            matched = false;
            return;
          }
        }
      });

      if(matched)
        return route;
    }
  }

  trim_hash(hash) {
    return helper.trim(hash, '#/');
  }
}



function init(config) {
  if(!instance)
    instance = new Route(config);
}

export default {init};