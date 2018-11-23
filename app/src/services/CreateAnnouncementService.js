import api from './api'

export default {
  CreateAnnouncement(announcement) {
    return api().post('announcements', announcement);
  },
};
