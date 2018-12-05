const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Product } = require('../../models');
const { Category } = require('../../models');
const { ProductCategory } = require('../../models');

const rootPath = '/loadbikes';
const failPath = '/fail';

describe('/loadbikes', () => {

  beforeEach(() => {
    return ProductCategory.destroy({
      where: {},
      force: true
    }).then(() => {
      return truncate();
    });
  });

  afterAll(() => {
    return ProductCategory.sequelize.close().then(() => {
        return Product.sequelize.close().then(() => {
            return Category.sequelize.close();
        });
    });
  });

  describe('GET /', () => {
    it('should return products that are associated with the Bikes category', () => {
      return Category.create({
        Name: 'Bikes'
      }).then((category) => {
        return Product.create({
          Name: 'product'
        }).then((product) => {
          return ProductCategory.create({
            ProductId: product.id,
            CategoryId: category.id
          }).then(() => {
            return request(app).get(rootPath).expect((response) => {
              return expect(response.body.length).toEqual(1);
            });
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
