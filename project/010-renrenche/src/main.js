import 'normalize.css';
import './Root.css';
import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue';
import Root from './Root.vue';
import Router from 'vue-router';

import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import Detail from './page/Detail';

import Me from './page/settings/Me';
import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Vehicle from './page/admin/Vehicle';
import Brand from './page/admin/Brand';
import Model from './page/admin/Model';
import Design from './page/admin/Design';
import SearchResult from './page/SearchResult';


Vue.use(Router);

Vue.config.productionTip = false;

const router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/detail', component: Detail },
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
        }
      ],
    },
  ],
});

new Vue({
  render: h => h(Root),
  router: router,
}).$mount('#root');
