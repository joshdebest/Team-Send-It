import api from './api';

export default {
  GetProduct(productId) {
    return api().get('products/' + productId);
  },
};
