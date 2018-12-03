import api from './api'

export default {
  CreateOrder(order) {
    return api().post('order', order);
  },
};
