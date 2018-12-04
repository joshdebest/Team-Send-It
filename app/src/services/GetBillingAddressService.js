import api from './api';

export default {
  GetBillingAddress(orderId) {
    return api().get('billingaddress/' + orderId);
  },
};
