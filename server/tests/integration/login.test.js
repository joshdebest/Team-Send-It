const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { AdminUser } = require('../../models');
const { Session } = require('../../models');

const rootPath = '/login';

describe('/login', () => {

  beforeEach(() => {
    return Session.destroy({
      where: {},
      force: true,
    }).then(() => {
      return truncate();
    });
  });

  afterAll(() => {
    return Session.sequelize.close().then(() => {
        return AdminUser.sequelize.close();
    });
  });

  describe('POST /', () => {
    it('should return an AdminUserId that represents there session login', () => {
      return AdminUser.create({
        Username: 'test@gmail.com',
        Password: 'test'
      }).then((adminuser) => {
        return request(app)
            .post(rootPath)
            .send({
                Username: 'test@gmail.com',
                Password: 'test'
            })
            .expect(200)
            .then((response) => {
                return expect(response.body.AdminUserId).toEqual(adminuser.id);
            });
      });
    });
  });

  describe('POST /fail1', () => {
      it('should return an error message due to incorrect password', () => {
          return AdminUser.create({
            Username: 'fail@gmail.com',
            Password: 'fail'
          }).then((adminuser) => {
            return request(app)
                .post(rootPath)
                .send({
                    Username: 'fail@gmail.com',
                    Password: 'test'
                })
                .expect(200)
                .then((response) => {
                    return expect(response.body.error).toEqual('Incorrect Email or Password');
                });
          });
      });
  });

  describe('POST /fail2', () => {
      it('should return an error message due to incorrect email', () => {
          return AdminUser.create({
            Username: 'try@gmail.com',
            Password: 'try'
          }).then((adminuser) => {
            return request(app)
                .post(rootPath)
                .send({
                    Username: 'fail@gmail.com',
                    Password: 'try'
                })
                .expect(200)
                .then((response) => {
                    return expect(response.body.error).toEqual('Incorrect Email or Password');
                });
          });
      });
  });
});
