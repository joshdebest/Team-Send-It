import api from './api';

export default {
  submitMessage (contactForm) {
      return api().post('contactforms', contactForm);
  },
};
