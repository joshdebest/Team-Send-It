import api from './api';

export default {
  GetAnnouncements() {
    return api().get('announcements');
  },
};
