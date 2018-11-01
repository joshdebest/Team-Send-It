import api from './api';

export default {
  submitMessage (adminUser) {
      return api().post('adminusers', adminUser);
  },
};
