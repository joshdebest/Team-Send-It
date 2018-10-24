const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { ContactForm } = require('../../models');

const rootPath = '/contactforms';
const failPath = '/fail';

describe('/contactforms', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return ContactForm.sequelize.close();
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.contactforms).toEqual([]);
        });
    });

    it('should return 1 item in the array', () => {
      return ContactForm.create({
        Name: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.contactforms.length).toEqual(1);
        });
      });
    });

    it('should return an item with a specific id', () => {
        return ContactForm.create({
            Name: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/'+item.id).expect((response) => {
                return expect(response.body.Name).toEqual('test');
            });
        });
    });

    it('should return an item with a specific name', () => {
        return ContactForm.create({
            Name: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/?name='+item.Name).expect((response) => {
                return expect(response.body.contactforms.length).toEqual(1);
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
        return ContactForm.create({
          Name: 'test',
        }).then((item) => {
          return request(app).delete(rootPath + '/' + item.id).expect((response) => {
            return expect(response.body.delete).toEqual(true);
          });
        });
    });
  });
});
