import api from './api';

export default {
  Logout(adminUserId) {
    return api().delete('logout/' + adminUserId);
  },
};
