import api from './api';

export default {
  GetCategories() {
    return api().get('categories');
  },
};
