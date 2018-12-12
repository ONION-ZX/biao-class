class Route {
    constructor(config) {
        this.current = {};
        this.article_id = {};
        this.state = Object.assign({}, config);
        this.root = document.querySelector('#root');

        // 当用户直接访问某个路由 默认情况下不会渲染页面
        this.init_page();
        this.detect_hash_change();
    }
    /**
     * 解析原始hash得到其对应的路由名 {eg:"#/home" => 'home'}
     * @param {object} hash 原始hash
     * @return {string} 路由名
     */
    parse_hash(hash) {
        hash = trim(hash, '#/');
        let re = new RegExp('^#?\/?' + hash + '\/?$');

        for (let key in this.state.route) {
            let item = this.state.route[key];
            if (re.test(item.path))
                return key;
        }
    }

    detect_hash_change() {
        window.addEventListener('hashchange', () => {
            this.current.hash = window.location.hash;
            
            let route_name = this.parse_current_hash();
            this.go(route_name);
        });
    }

    go(route_name) {
        let route = this.state.route[route_name];

        if(!route)
            return;
        
        //如果当前路由有前置钩子 那么在切换至本路由前执行它
        //如果钩子返回false就停止执行
        if(route.hook && route.hook.before && route.hook.before() === false)
            return;
        
        //保存上条历史路由
        this.previous = this.current;
        
        //保存当前路由
        this.current = route;
        this.remove_previous_tpl();

        this.render_current( () => {

            //如果当前路由有后置钩子 那么在切换本路由后执行它
            route.hook && route.hook.after && route.hook.after();
        });
    }

    remove_previous_tpl() {
        this.root.innerHTML = '';
    }

    init_page() {
        let route_name = this.parse_hash(location.hash);
        if(!route_name)
            route_name = this.state.default;
        
        this.go(route_name);      
    }

    set_data(route_name, keys, value) {

        //更新数据
        let layers = keys.split('.');
        let layer_count = layers.length;

        //获取当前路由的数据
        let data = this.state.route[route_name].data;
        if(!data)
            data = this.state.route[route_name].data = {};

        for(let i = 0; i < layer_count; i++) {
            let key = layers[i];
            let is_last = i + 1 == layer_count;
            let nest = data;

            if(is_last) {
                nest[key] = value;
            } else {
                if(!nest[key])
                    nest[key] = {};
                nest = nest[key];
            }
        }

        //更新视图
        this.compile(this.state.route[route_name]);
    }

    render_current(on_render_finish) {
        this.render(this.current, on_render_finish);
    }

    render(route, on_render_finish) {

        //已缓存模板
        if(route.$template) {
            this.compile(route, on_render_finish);
            return;
        }

        //根据路由对象中的模板地址取模板代码(HTML)

        this.get_template(route.template_url, (tpl) => {
            //自动生成
            route.$template = tpl;
            this.compile(route, on_render_finish);
        });
    }

    compile(route, on_compile_finish) {
        this.root.innerHTML = parse(route.$template, route.data);
        if(on_compile_finish)
            on_compile_finish();
    }

    parse_current_hash() {
        var re = /\?+/;
        if(re.test(this.current.hash))
            return this.parse_hash_param(this.current.hash);
        else 
            return this.parse_hash(this.current.hash);
    }

    parse_hash_param() {
        let param_obj = {};
        //['#/article','id=1']
        let hash_group = this.current.hash.split('?');
        let param = hash_group[1]; 
        let param_list = param.split('=');
        this.article_id = JSON.parse(param_list[1]);

        return this.parse_hash(hash_group[0]);

    }

    get_template(url, on_succeed) {
        const http = new XMLHttpRequest();
        http.open('get',url);
        http.send();

        http.addEventListener('load',() => {
            on_succeed(http.responseText);
        });
    }
}

function trim(str, cap_list) {
    let arr = cap_list.split('');

    arr.forEach(function(cap) {
        if(str.startsWith(cap)) {
            str = str.substring(1);
            str = trim(str,cap);
        }

        if(str.endsWith(cap)) {
            str = str.substring(0, str.length-1);
            str = trim(str,cap);
        }
    });
    return str;
}
