import api from './api'

export default {
  RemoveAnnouncement(announcementId) {
    return api().delete('announcements/' + announcementId);
  },
};
