// import '~normalize.css/normalize.css';
import './Root.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import Vue from 'vue';
import Root from './Root.vue';
import Router from 'vue-router';

import session from './lib/session';
import Focus from './directive/focus';

import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import Detail from './page/Detail';
import Publish from './page/Publish';

import SearchResult from './page/SearchResult';

import Me from './page/settings/Me';
import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Vehicle from './page/admin/Vehicle';
import Brand from './page/admin/Brand';
import Model from './page/admin/Model';
import Design from './page/admin/Design';
import Report from './page/admin/Report';
import Order from './page/admin/Order';



Vue.use(Router);

Vue.config.productionTip = false;

const router = new Router({
  routes: [
    { path: '/', component: Home, meta : { title : 'vvrtade' }},
    { path: '/login', component: Login, meta:{title:'vvtrade/login'}},
    { path: '/signup', component: Signup, meta:{title:'vvtrade/signup'} },
    { path: '/detail/:id', component: Detail, meta:{title:'vvtrade/detail'} },
    { path: '/me', component: Me, meta:{title:'vvtrade/me'} },
    { path: '/search-result', component: SearchResult, meta:{title:'vvtrade/result'}},
    { path: '/publish', component: Publish, meta:{title:'vvtrade/publish'} },
    {
      path: '/admin',
      component: AdminBase,
      children: [
        {
          path: 'user',
          component: User,
        },
        {
          path: 'vehicle',
          component: Vehicle,
        },
        {
          path: 'brand',
          component: Brand,
        },
        {
          path: 'model',
          component: Model,
        },
        {
          path: 'design',
          component: Design,
        },
        {
          path: 'report',
          component: Report,
        },   
        {
          path: 'order',
          component: Order,
        },             
      ],
    },
  ],
});

Vue.filter('only_day', function (value) {
    if (!value)
        return value;
      return value.split(' ')[0];
  });

Vue.filter('percentage', function (value) {
   if (!value)
       return 0;

    // return Number(value).toFixed(2) * 100 + '%';
    return Number(value * 100).toFixed(2) + '%';
});

router.beforeEach((to, from, next) => {
   let go_admin = to.fullPath.startsWith('/admin/');
   let go_publish = to.fullPath.startsWith('/publish');

   if(go_publish && !session.is_login()) {
    alert('请先登录!如无账号请先注册');
    next('/login');
   }


  //当非管理员想进入管理页时,跳到登录页以管理员身份登录
   if (go_admin && !session.is_admin()) {
     alert('请先使用管理员账号登录，用户名：admin，密码：adminadmin');
     next('/login');
   } else
     next();
    document.title = to.meta.title;
  });

new Vue({
  directives:{ Focus },
  render: h => h(Root),
  router: router,
}).$mount('#root');
