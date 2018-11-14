import api from './api'

export default {
  CreateUser(adminUser) {
    return api().post('adminusers', adminUser);
  },
};
