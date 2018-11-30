import api from './api';

export default {
  GetOrder(orderId) {
    return api().get('order/' + orderId);
  },
};
