const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Product } = require('../../models');
const { Category } = require('../../models');
const { ProductCategory } = require('../../models');

const rootPath = '/product';
const failPath = '/fail';

describe('/product', () => {

  beforeEach(() => {
    return ProductCategory.destroy({
      where: {},
      force: true
    }).then(() => {
      return truncate();
    });
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

    it('should return 1 product in the array', () => {
      return Product.create({
        Name: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.products.length).toEqual(1);
        });
      });
    });

    it('should return a product with a specific id', () => {
        return Product.create({
            Name: 'test',
        }).then((product) => {
            return request(app).get(rootPath+'/'+product.id).expect((response) => {
                return expect(response.body.product.Name).toEqual('test');
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
    it('should create a product', () => {
      return Category.create({
        Name: 'Bikes'
      }).then((category) => {
      return request(app)
        .post(rootPath)
        .send({
          Name: 'test',
          categoryList: []
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.Name).toEqual('test');
        });
      });
    });
  });

  describe('PUT /', () => {
    it('should update a product', () => {
      return Category.create({
        Name: 'category'
      }).then((category) => {
        return Product.create({
          Name: 'test',
          Qty: category.id
        }).then((product) => {
          return ProductCategory.create({
            ProductId: product.id,
            CategoryId: category.id
          }).then((prodcat) => {
            return request(app)
              .put(rootPath+'/'+prodcat.ProductId)
              .send({
                Name: 'updatedTest',
                categoryList: []
              })
              .expect(200)
              .then((response) => {
                return expect(response.body.Name).toEqual('updatedTest');
              });
          });
        });
      });
    });
  });

  describe('DELETE /', () => {
    it('should delete one product', () => {
      return Category.create({
        Name: 'category',
      }).then((category) => {
        return Product.create({
          Name: 'product',
          Qty: category.id
        }).then((product) => {
          return ProductCategory.create({
            ProductId: product.id,
            CategoryId: category.id
          }).then((prodcat) => {
            return request(app).delete(rootPath+'/'+prodcat.ProductId).expect((response) => {
              return expect(response.body.delete).toEqual(true);
            });
          });
        });
      });
    });
  });
});
