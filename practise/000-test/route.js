import helper from '../Util/helper';

let instance;

class Route {
    /**
     * 用于保存当前页面名称，此名称与对应的页面id是相同的，
     * 一般是通过this.parse_hash()解析得到
     * '#/a' -> 'a' -> <div id="a">
     *           ^ this is current
     * @property {Object} current
     * @property {Object} previous
     *
     * 默认配置项
     * @property {Object} def （default config）
     *
     * 可配置项
     * @property {Object} config
     * @var config.routes 记录所有路由状态和设置
     * @var config.before 切换前执行的回调函数（使用者的自定义代码）
     * @var config.before 切换后执行的回调函数
     *
     * */

    /**
     * 初始化
     */
    constructor(config) {
        this.param = {};
        this.load_config(config);

        /*默认为首页，但如果地址栏直接有hash就去已有的地址*/
        this.detect_click(); // 监听页面中所有的点击
        this.detect_hash_change(); // 监听地址变化
        this.go(window.location.hash, { force: true });
    }

    /**
     * 加载所有配置
     */
    load_config(config) {
        this.def = { hook: {} };
        this.config = Object.assign({}, this.def, config);
        this.load_route_config();
    }

    /**
     * 加载路由配置
     */
    load_route_config() {
        let route_list = this.config.routes;

        for (var name in route_list) {
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

        console.log('this.config:', this.config);
    }

    /**
     * 监听地址改变
     */
    detect_hash_change() {
        window.addEventListener('hashchange', () => {
            /*如果发生改变就去对应页面*/
            this.go(window.location.hash);
        });
    }

    /**
     * 监听页面中所有的点击事件
     * */
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

    /**
     * 更改路由
     * @param {string} hash 原始hash路径，如: #/about
     * @param {Object} opt 配置项，如：{force: false}
     * */
    go(hash, opt = null) {
        this.hide('#not-found');
        /*钩子*/
        if (this.config.hook.before)
            if (!this.config.hook.before())
                return;

        hash = hash || 'home';

        let def = {
            force: false,
        };

        opt = Object.assign({}, def, opt);

        /*通过原始hash解析真正的页面名称 /#/home => home */
        let old_state = this.current;

        /*通过地址（也就是hash）判断是哪一个路由*/
        let new_state = this.parse_hash(hash);

        this.previous = old_state;

        if (!new_state) {
            if (this.config.hook.notFount)
                this.config.hook.notFount();
            this.render('#not-found');
            return;
        }

        // 设置当前页名
        this.current = new_state;

        console.log('this.current:', this.current);

        if (!this.current.el)
            throw new ReferenceError(`Please config route ${this.current.name} el`);


        /*渲染新页面*/
        this.render();

        if (this.config.hook.after)
            this.config.hook.after(this.current);
    }

    compile(route) {
        route = route || this.current;

        if (!route)
            return;

        let el = document.querySelector(route.el);
        if (!el || !route.param) return;
        let old = document.querySelectorAll('.compiled');
        old.forEach(item => item.remove());
        el.insertAdjacentHTML('afterbegin', `<p class="compiled">我的ID是${route.param.id}</p>`);
    }

    hide(el) {
        var el = document.querySelector(el);
        if (!el)
            return;
        el.hidden = true;
    }

    /**
     * 渲染页面
     * @param {string} 页面名称
     * */
    render(selector) {
        var content;
        selector = selector || this.current.el;

        /*先隐藏所有页面*/
        this.hide_previous();

        /*选中当前页面*/
        content = document.querySelector(selector);

        if (!content)
            return;

        this.compile(this.current);

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

    /**
     * 通过原始hash解析页面名称
     * @return {Object} 举例：{path: '/article', param: {id: 1}}
     * */
    parse_hash(hash) {
        hash = this.trim_hash(hash);
        let hash_arr = hash.split('/');
        let routes = this.config.routes;

        for (var name in routes) {
            let route = routes[name];
            let $segment = route.$segment;
            let matched = true;

            if (Object.keys($segment).length != hash_arr.length) {
                matched = false;
                continue;
            }

            hash_arr.forEach(function (segment, index) {
                let $segment = route.$segment[index];
                let $name = $segment.name;

                if (!$segment) {
                    matched = false;
                    return;
                }

                if ($segment.is_param) {
                    route.param[$name] = segment;
                } else {
                    if ($name != segment) {
                        matched = false;
                        return;
                    }
                }
            });

            if (matched)
                return route;
        }

    }

    trim_hash(hash) {
        return helper.trim(hash, '#/');
    }

    // parse_hash (hash) {
    //
    //   let hash_arr = hash.split('/');
    //
    //   let hash_length = hash_arr.length;
    //   let $config, $segment;
    //
    //   hash_arr.forEach((segment, index) => {
    //     if (index < 1)
    //       return;
    //
    //     if (index == 2) {
    //       $config  = this.config.routes[segment];
    //       $segment = $config.$segment;
    //     }
    //
    //     let $param = $segment[index];
    //
    //     if ($param.is_param) {
    //       $config.param              = $config.param || {};
    //       $config.param[$param.name] = segment;
    //     }
    //
    //     console.log(this.config.routes.article.param);
    //   });
    //
    //   return hash_arr[hash_arr.length - 1];
    // }
}

/*初始化*/
function init(config) {
    if (!instance)
        instance = new Route(config);
}

export default { init };
