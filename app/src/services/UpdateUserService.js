import api from './api';

export default {
  UpdateUser(id, adminUser) {
    return api().put('adminusers/' + id, adminUser);
  },
};
