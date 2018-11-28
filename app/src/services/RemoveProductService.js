import api from './api'

export default {
  RemoveProduct(productId) {
    return api().delete('products/' + productId);
  },
};
