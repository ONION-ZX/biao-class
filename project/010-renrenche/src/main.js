import 'normalize.css';
import './css/util/bootstrap.css'
import './Root.css';

import Vue from 'vue';
import Root from './Root.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Root),
}).$mount('#root');