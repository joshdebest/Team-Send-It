import api from './api'

export default {
  RemoveUser(adminUserId) {
    return api().delete('adminusers/' + adminUserId);
  },
};
