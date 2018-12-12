import Vue  from 'vue';
import App  from './App.vue';
import Vuex from 'vuex';
import api from './api';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state     : {
    count : 1,
    price : 10,
    info  : null,
  },
  mutations : {
    increment (state) {
      state.count++;
    },
  },
  getters   : {
    total (state) {
      return state.price * state.count;
    },
  },
  actions   : {
    increment_timer (store) {
      setInterval(() => {
        store.commit('increment');
      }, 500);
    },

    get_data (store) {
      api('product/read')
        .then(r => store.state.info = r.data);
    },
  },
});


new Vue({
  render : h => h(App),
  store,
}).$mount('#app');
