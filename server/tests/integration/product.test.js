const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Product } = require('../../models');

const rootPath = '/products';
const failPath = '/fail';

describe('/products', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return Product.sequelize.close();
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.products).toEqual([]);
        });
    });

    it('should return 1 item in the array', () => {
      return Product.create({
        Name: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.products.length).toEqual(1);
        });
      });
    });

    it('should return an item with a specific id', () => {
        return Product.create({
            Name: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/'+item.id).expect((response) => {
                return expect(response.body.Name).toEqual('test');
            });
        });
    });

    it('should return an item with a specific name', () => {
        return Product.create({
            Name: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/?name='+item.Name).expect((response) => {
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

  describe('POST /', () => {
    it('should create one contact form item', () => {
      return request(app)
        .post(rootPath)
        .send({
          CustomerName: 'test',
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.CustomerName).toEqual('test');
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete one contact form item', () => {
        return Order.create({
          CustomerName: 'test',
        }).then((item) => {
          return request(app).delete(rootPath + '/' + item.id).expect((response) => {
            return expect(response.body.delete).toEqual(true);
          });
        });
    });
  });
});
