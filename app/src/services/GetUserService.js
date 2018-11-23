import api from './api';

export default {
  GetUser(adminUserId) {
    return api().get('adminusers/' + adminUserId);
  },
};
