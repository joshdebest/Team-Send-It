const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { ContactForm } = require('../../models');

const rootPath = '/contactforms';

describe('/contactforms', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return ContactForm.sequelize.close();
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
});
