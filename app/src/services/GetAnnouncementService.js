import api from './api';

export default {
  GetAnnouncement(announcementId) {
    return api().get('announcements/' + announcementId);
  },
};
