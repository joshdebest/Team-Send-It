import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged_in: false,
    id: 0,
    forSale: [
      { invId: 1, name: 'An Item', image: '//placehold.it/200', price: 999 },
      { invId: 2, name: 'Thing', image: '//placehold.it/200', price: 1499 },
      { invId: 3, name: 'Doo-dad', image: '//placehold.it/200', price: 499 },
      { invId: 4, name: 'Other thing', image: '//placehold.it/200', price: 299 },
    ],
    inCart: [],
  },
  getters: {
    id: state => state.id,
    forSale: state => state.forSale,
    inCart: state => state.inCart,
  },
  mutations: {
    login(state, id) {
      state.id = id,
      state.logged_in = true
    },
    logout(state) {
      state.logged_in = false
    },
    ADD_TO_CART(state, invId) { state.inCart.push(invId) },
      REMOVE_FROM_CART(state, index) { state.inCart.splice(index, 1); },
  },
  actions: {
      addToCart(context, invId) { context.commit('ADD_TO_CART', invId);},
      removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
  },
});
