import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged_in: false,
    id: 0
  },
  mutations: {
    login(state, id) {
      state.id = id,
      state.logged_in = true
    },
    logout(state) {
      state.logged_in = false
    }
  },
  actions: {

  },
});
