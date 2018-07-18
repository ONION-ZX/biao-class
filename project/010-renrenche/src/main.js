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
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/detail/:id', component: Detail },
    { path: '/me', component: Me },
    { path: '/search-result', component: SearchResult},
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
  
   if (go_admin && !session.is_admin()) {
     alert('请先使用管理员账号登录，用户名：admin，密码：adminadmin');
     next('/login');
   } else
     next();
  });

new Vue({
  directives:{ Focus },
  render: h => h(Root),
  router: router,
}).$mount('#root');
