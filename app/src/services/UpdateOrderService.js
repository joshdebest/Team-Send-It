import api from './api';

export default {
  UpdateOrderStatus(id, orderStatus) {
    return api().put('order/' + id, orderStatus);
  },
};
