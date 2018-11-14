const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { BillingAddress } = require('../../models');

const rootPath = '/billingaddresses';
const failPath = '/fail';

describe('/billingaddresses', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return BillingAddress.sequelize.close();
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.billingaddresses).toEqual([]);
        });
    });

    it('should return 1 item in the array', () => {
      return BillingAddress.create({
        Street: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.billingaddresses.length).toEqual(1);
        });
      });
    });

    it('should return an item with a specific id', () => {
        return BillingAddress.create({
            Street: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/'+item.id).expect((response) => {
                return expect(response.body.Street).toEqual('test');
            });
        });
    });

    it('should return an item with a specific name', () => {
        return BillingAddress.create({
            Name: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/?name='+item.Name).expect((response) => {
                return expect(response.body.billingaddresses.length).toEqual(1);
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
          Street: 'test',
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.Street).toEqual('test');
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete one contact form item', () => {
        return BillingAddress.create({
          Street: 'test',
        }).then((item) => {
          return request(app).delete(rootPath + '/' + item.id).expect((response) => {
            return expect(response.body.delete).toEqual(true);
          });
        });
    });
  });
});
