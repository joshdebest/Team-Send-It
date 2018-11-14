import api from './api';

export default {
  Login(adminUser) {
    return api().post('login', adminUser);
  },
};
