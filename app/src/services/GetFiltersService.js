import api from './api';

export default {
  GetFilters(productId) {
    return api().post('filter/' + productId);
  },
};
