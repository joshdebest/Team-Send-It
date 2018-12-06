const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { BillingAddress } = require('../../models');
const { Order } = require('../../models');

const rootPath = '/billingaddress';
const failPath = '/fail';

describe('/billingaddress', () => {

  beforeEach(() => {
    return BillingAddress.destroy({
      where: {},
      force: true
    }).then(() => {
      return truncate();
    });
  });

  afterAll(() => {
    return BillingAddress.sequelize.close().then(() => {
        return Order.sequelize.close();
    });
  });

  describe('GET /', () => {
    it('should return a billing address with a specific order id', () => {
      return Order.create({
        CustomerName: 'test'
      }).then((order) => {
        return BillingAddress.create({
          Street: 'test',
          OrderId: order.id
        }).then((item) => {
          return request(app).get(rootPath+'/'+item.OrderId).expect((response) => {
            return expect(response.body.Street).toEqual('test');
          });
        });
      });
    });

    it('should return a 404 error', () => {
        return request(app)
            .get(failPath)
            .expect(404);
    });
  });
});
