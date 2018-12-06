const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Product } = require('../../models');

const rootPath = '/productqty';

describe('/productqty', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return Product.sequelize.close();
  });

  describe('PUT /', () => {
    it('should update the quantity of a product', () => {
      return Product.create({
        Name: 'test',
        Qty: 5
    }).then((product) => {
      return request(app)
        .put(rootPath+'/'+product.id)
        .send({
          Quantity: 5,
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.Qty).toEqual(10);
        });
      });
    })
  });
});
