import api from './api';

export default {
  submitMessage (adminUser) {
      return api().get('adminusers', adminUser);
  },
};
