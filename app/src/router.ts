import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);
Vue.use(VueAxios, axios);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Contact.vue'),
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: () => import('./views/Accessories.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('./views/Services.vue'),
    },
      {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue'),
      },
      {
          path: '/bikes',
          name: 'bikes',
          component: () => import('./views/Bikes.vue'),
      },
      {
          path: '/item',
          name: 'item',
          component: () => import('./views/Item.vue'),
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('./views/Checkout.vue'),
      },
  ],
});
