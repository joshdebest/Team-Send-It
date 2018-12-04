const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Category } = require('../../models');

const rootPath = '/categories';
const failPath = '/fail';

describe('/adminusers', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return Category.sequelize.close();
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.categories).toEqual([]);
        });
    });

    it('should return 1 item in the array', () => {
      return Category.create({
        Name: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.categories.length).toEqual(1);
        });
      });
    });

    it('should return an item with a specific id', () => {
      return Category.create({
        Name: 'test',
      }).then((item) => {
        return request(app).get(rootPath+'/'+item.id).expect((response) => {
          return expect(response.body.Name).toEqual('test');
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
          Name: 'test',
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.Name).toEqual('test');
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete one contact form item', () => {
        return Category.create({
          Name: 'test',
        }).then((item) => {
          return request(app).delete(rootPath + '/' + item.id).expect((response) => {
            return expect(response.body.delete).toEqual(true);
          });
        });
    });
  });

  describe('PUT /', () => {
    it('should update one announcement item', () => {
        return Category.create({
            Name: 'test',
        }).then((item) => {
            return request(app)
                .put(rootPath + '/' + item.id)
                .send({
                    Name: 'updatedtest',
                })
                .expect(200)
                .then((response) => {
                    return expect(response.body.Name).toEqual('updatedtest');
                });
        });
    });
  });
});
