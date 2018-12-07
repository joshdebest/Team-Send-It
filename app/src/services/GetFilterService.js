import api from './api';

export default {
  GetFilter(categoryId) {
    return api().get('filter/' + categoryId);
  },
};
