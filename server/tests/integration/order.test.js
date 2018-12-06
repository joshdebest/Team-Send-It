const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Order } = require('../../models');
const { BillingAddress } = require('../../models');
const { Product } = require('../../models');
const { ProductOrder } = require('../../models');

const rootPath = '/order';
const failPath = '/fail';

describe('/order', () => {

  beforeEach(() => {
    return BillingAddress.destroy({
      where: {},
      force: true,
    }).then(() => {
      return ProductOrder.destroy({
        where: {},
        force: true,
      }).then(() => {
        return truncate();
      });
    });
  });

  afterAll(() => {
    return ProductOrder.sequelize.close().then(() => {
        return BillingAddress.sequelize.close().then(() => {
            return Product.sequelize.close().then(() => {
                return Order.sequelize.close();
            });
        });
    });
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.orders).toEqual([]);
        });
    });

    it('should return 1 order in the array', () => {
      return Order.create({
        CustomerName: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.orders.length).toEqual(1);
        });
      });
    });

    it('should return a 404 error', () => {
        return request(app)
            .get(failPath)
            .expect(404);
    });
  });

  describe('GET /id', () => {
      it('should return an order with a specific id', () => {
          return Order.create({
              CustomerName: 'test',
          }).then((order) => {
              return BillingAddress.create({
                  Street: 'test',
                  OrderId: order.id
              }).then((billingaddress) => {
                  return Product.create({
                      Name: 'product',
                      Qty: billingaddress.OrderId
                  }).then((product) => {
                      return ProductOrder.create({
                          OrderId: product.Qty,
                          ProductId: product.id
                      }).then((prodord) => {
                          return request(app).get(rootPath+'/'+prodord.OrderId).expect((response) => {
                              return expect(response.body.order.CustomerName).toEqual('test');
                          });
                      })
                  })
              })
          });
      });
  });

  describe('POST /', () => {
    it('should create an order', () => {
      return request(app)
        .post(rootPath)
        .send({
          CustomerName: 'test',
          Address: { street: 'test', city: 'ave', state: 'CA', zipcode: '93401' },
          Products: []
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.CustomerName).toEqual('test');
        });
    });
  });

  describe('PUT /', () => {
    it('should update the status of an order', () => {
        return Order.create({
          Status: 'Pending',
        }).then((order) => {
          return request(app)
              .put(rootPath + '/' + order.id)
              .send({
                Status: 'Completed'
              })
              .expect(200)
              .then((response) => {
                  return expect(response.body.Status).toEqual('Completed');
              });
        });
    });
  });
});
