const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { AdminUser } = require('../../models');
const { Session } = require('../../models');

const rootPath = '/logout';

describe('/logout', () => {

  beforeEach(() => {
    return Session.destroy({
      where: {},
      force: true
    }).then(() => {
      return truncate();
    });
  });

  afterAll(() => {
    return Session.sequelize.close().then(() => {
        return AdminUser.sequelize.close();
    });
  });

  describe('DELETE /', () => {
    it('should return true if a session was destroyed', () => {
      return AdminUser.create({
        Username: 'test@gmail.com',
        Password: 'test'
      }).then((adminuser) => {
        return Session.create({
            AdminUserId: adminuser.id
        }).then((session) => {
            return request(app).delete(rootPath+'/'+session.AdminUserId).expect((response) => {
                    return expect(response.body).toEqual(true);
                });
        });
      });
    });
  });
});
