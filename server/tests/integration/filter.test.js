const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Product } = require('../../models');
const { Category } = require('../../models');
const { ProductCategory } = require('../../models');

const rootPath = '/filter';
const failPath = '/fail';

describe('/filter', () => {

  beforeEach(() => {
    return ProductCategory.destroy({
      where: {},
      force: true
    }).then(() => {
      return truncate();
    })
  });

  afterAll(() => {
    return ProductCategory.sequelize.close().then(() => {
        return Product.sequelize.close().then(() => {
            return Category.sequelize.close();
        });
    });
  });

  describe('GET /', () => {
    it('should return a products that are associated with a category', () => {
      return Product.create({
        Name: 'product'
      }).then((product) => {
        return Category.create({
          Name: 'category'
        }).then((category) => {
          return ProductCategory.create({
            ProductId: product.id,
            CategoryId: category.id
          }).then((prodcat) => {
            return request(app).get(rootPath+'/'+prodcat.CategoryId).expect((response) => {
              return expect(response.body.length).toEqual(1);
            });
          })
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
    it('should return a list of categories that are associated with a product', () => {
      return Category.create({
        Name: 'category'
      }).then((category) => {
        return Product.create({
          Name: 'product'
        }).then((product) => {
          return ProductCategory.create({
            ProductId: product.id,
            CategoryId: category.id
          }).then((prodcat) => {
            return request(app).post(rootPath+'/'+prodcat.ProductId).expect((response) => {
                return expect(response.body.length).toEqual(1);
            });
          });
        });
      });
    });

    it('should return a 404 error', () => {
        return request(app)
            .post(failPath)
            .expect(404);
    });
  });
});
