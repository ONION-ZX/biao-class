import article_api from './Api/article';
import article_ui from './Ui/article';
// import send from './Util/send';
import route from './Route/route';

let config = {
    routes: {
        home: {
            path: '/home',
            el: '#home',
        },
        about: {
            path: '/about',
            el: '#about',
        },
        article: {
            path: '/article/:author/:id', // ['article', ':author', ':id']
            el: '#article',
        },
        article_list: {
            path: '/article-list',
            el: '#article-list',
        },
        tag: {
            path: '/tag',
            el: '#tag',
        },
    },
    hook: {
        before: function () {
            //还没摸到数据 一般用于查看权限
            return true;
            // let he_is_admin = true;
            // if (!he_is_admin)
            //   return false;
            // return true;
        },
        after: function (route) {
            // 通过接口拿数据
            article_api.read(1,(data) => {
                // 动态渲染内容
                article_ui.render(data);
            });
        },
    },
};

route.init(config);
