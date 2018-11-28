import api from './api'

export default {
  CreateCategory(category) {
    return api().post('categories', category);
  },
};
