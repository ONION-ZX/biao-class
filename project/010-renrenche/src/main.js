import 'normalize.css';
import './main.css';

import Vue from 'vue';
import Root from './Root.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Root),
}).$mount('#root');
