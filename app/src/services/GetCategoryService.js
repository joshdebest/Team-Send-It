import api from './api';

export default {
  GetCategory(categoryId) {
    return api().get('categories/' + categoryId);
  },
};
