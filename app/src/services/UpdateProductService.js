import api from './api';

export default {
  UpdateProduct(id, product) {
    return api().put('product/' + id, product);
  },
};
