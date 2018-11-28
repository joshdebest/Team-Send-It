import api from './api';

export default {
  UpdateAnnouncement(id, announcement) {
    return api().put('announcements/' + id, announcement);
  },
};
