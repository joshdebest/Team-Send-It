const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Category } = require('../../models');
const { Product } = require('../../models');

const rootPath = '/loadbikes';
const failPath = '/fail';

describe('/loadbikes', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return Category.sequelize.close().then(() => {
        return Product.sequelize.close();
    });
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect(404);
    });

    it('should return 1 item in the array', () => {
      return Category.create({
        Name: 'Bikes',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.products).toEqual([]);
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
