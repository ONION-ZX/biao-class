import helper from '../Util/helper';

let instance;

class Route {
  constructor(config) {
    this.param = {};
    this.load_config(config);

    this.detect_click();
    this.detect_hash_change();
    this.go(window.location.hash, {force: true});
  }

  load_config(config) {
    this.def = {hook: {}};
    this.config = Object.assign({}, this.def, config);
    this.load_route_config();
  }

  load_route_config() {
    let route_list = this.config.routes;

    for(var name in route_list) {
      let route = route_list[name];
      let path = this.trim_hash(route.path);
      let path_arr = path.split('/');
      route.param = {};
      route.name = name;

      path_arr.forEach((segment, index) => {
        let is_param = segment.startsWith(':');
        let key = is_param ? segment.substring(1, segment.length) : segment;
        route.$segment = route.$segment || {};
        route.$segment[index] = {
          name: key,
          position: index,
          is_param: is_param,
        };
      });
    }
    console.log(this.config);
  }

  detect_hash_change() {
    window.addEventListener('hashchange', () => {
      /*如果发生改变就去对应页面*/
      this.go(window.location.hash);
    });
  }

  detect_click() {
    document.addEventListener('click', e => {
      var target = e.target;

      /*看看点击的是哪类元素*/
      switch (target.nodeName) {
        /*如果是<a>元素*/
        case 'A':
          /*如果是外站链接就停止后续操作*/
          if (target.host)
            return;

          /*去对应地址*/
          this.go(target.hash);
          break;
      }
    });
  }

  go(hash, opt = null) {
    this.hide('#not-found');

    if(this.config.hook.before)
      if(!this.config.hook.before())
        return;

    hash = hash || 'home';

    let def = {
      force: false,
    };

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

    console.log(this.current);

    if(!this.current.el)
      throw new ReferenceError(`Please config route ${this.current.name} el`);

    this.render();

    if(this.config.hook.after)
      this.config.hook.after(this.current);
  }

  hide(el) {
    var el = document.querySelector(el);
    if (!el)
      return;
    el.hidden = true;
  }

  render(selector) {
    var content;
    selector = selector || this.current.el;

    /*先隐藏所有页面*/
    this.hide_previous();

    /*选中当前页面*/
    content = document.querySelector(selector);

    if (!content)
      return;

    content.hidden = false;
  }

  show(el) {
    /*显示当前页面*/
    document.querySelector(el).hidden = false;
  }

  /**
   * 隐藏所有页面
   * */
  hide_previous() {
    if (!this.previous)
      return;

    document.querySelector(this.previous.el).hidden = true;
  }

  parse_hash(hash) {
    hash = this.trim_hash(hash);
    let hash_arr = hash.split('/');
    let routes = this.config.routes;

    for(var name in routes) {
      let route = routes[name];
      let $segment = route.$segment;
      let matched = true;

      if (Object.keys($segment).length != hash_arr.length) {
        matched = false;
        continue;
      }

      hash_arr.forEach((segment, index) => {
        let $segment = route.$segment[index];
        let $name = $segment.name;

        if(!$segment) {
          matched = false;
          return;
        } 

        if($segment.is_param) {
          route.param[$name] = segment
        } 
        
        else if($name != segment) {
          matched = false;
          return;
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