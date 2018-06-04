// import article from './Api/article';
import route from './Route/route';
// article.read();

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
            path: '/article/:author/:id',
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
            return true;
            // let he_is_admin = true;
            // if (!he_is_admin)
            //   return false;
            // return true;
        },
        after: function (route) {
            // route.param.yo; // undefined
            // console.log('后');
            // console.log('route:', route);
        },
    },
};

route.init(config);
