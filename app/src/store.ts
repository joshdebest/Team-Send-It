import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged_in: false,
    id: 0,
    forSale: [],
    inCart: [],
    allProducts: []
  },
  getters: {
    id: state => state.id,
    forSale: state => state.forSale,
    inCart: state => state.inCart,
    allProducts: state => state.allProducts
  },
  mutations: {
    login(state, id) {
      state.id = id,
      state.logged_in = true
    },
    logout(state) {
      state.logged_in = false
    },
    ADD_TO_CART(state, invId) {
        state.inCart.push(invId)
    },
    REMOVE_FROM_CART(state, index) {
        state.inCart.splice(index, 1);
    },
    SET_CART(state, cart) {
        state.inCart = cart;
    },
    ADD_TO_FOR_SALE(state, items) {
        state.forSale = items;
    },
    CREATE_PRODUCTS(state, products) {
        state.allProducts = products;
    }
  },
  actions: {
      createProducts(context, products) { context.commit('CREATE_PRODUCTS', products); },
      setCart(context, cart) { context.commit('SET_CART', cart); },
      addToForSale(context, items) { context.commit('ADD_TO_FOR_SALE', items); },
      addToCart(context, invId) { context.commit('ADD_TO_CART', invId);},
      removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
  },
});
