import api from './api';

export default {
  GetUsers() {
    return api().get('adminusers');
  },
};
