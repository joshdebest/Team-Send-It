import api from './api'

export default {
  CreateProduct(product) {
    return api().post('product', product);
  },
};
