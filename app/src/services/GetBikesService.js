import api from './api';

export default {
  GetBikes() {
    return api().get('loadbikes');
  },
};
