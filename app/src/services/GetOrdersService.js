import api from './api';

export default {
  GetOrders() {
    return api().get('order');
  },
};
