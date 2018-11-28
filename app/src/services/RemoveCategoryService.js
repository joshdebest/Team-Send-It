import api from './api'

export default {
  RemoveCategory(categoryId) {
    return api().delete('categories/' + categoryId);
  },
};
