import api from './api';

export default {
  GetProducts() {
    return api().get('product');
  },
};
