import api from './api';

export default {
  GetAccessories() {
    return api().get('loadaccessories');
  },
};
