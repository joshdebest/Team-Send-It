const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { Announcement } = require('../../models');

const rootPath = '/announcements';
const failPath = '/fail';

describe('/announcements', () => {

  beforeEach(() => {
    return truncate();
  });

  afterAll(() => {
    return Announcement.sequelize.close();
  });

  describe('GET /', () => {
    it('should return an empty array', () => {
      return request(app)
        .get(rootPath)
        .expect((response) => {
          return expect(response.body.announcements).toEqual([]);
        });
    });

    it('should return 1 announcement in the array', () => {
      return Announcement.create({
        Title: 'test',
      }).then(() => {
        return request(app).get(rootPath).expect((response) => {
          return expect(response.body.announcements.length).toEqual(1);
        });
      });
    });

    it('should return an announcement with a specific id', () => {
        return Announcement.create({
            Title: 'test',
        }).then((item) => {
            return request(app).get(rootPath+'/'+item.id).expect((response) => {
                return expect(response.body.Title).toEqual('test');
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
    it('should create one announcement item', () => {
      return request(app)
        .post(rootPath)
        .send({
          Title: 'test',
        })
        .expect(200)
        .then((response) => {
          return expect(response.body.Title).toEqual('test');
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete one announcement item', () => {
        return Announcement.create({
          Title: 'test',
        }).then((item) => {
          return request(app).delete(rootPath + '/' + item.id).expect((response) => {
            return expect(response.body.delete).toEqual(true);
          });
        });
    });
  });

  describe('PUT /', () => {
    it('should update one announcement item', () => {
        return Announcement.create({
            Title: 'test',
        }).then((item) => {
            return request(app)
                .put(rootPath + '/' + item.id)
                .send({
                    Title: 'updatedtest',
                })
                .expect(200)
                .then((response) => {
                    return expect(response.body.Title).toEqual('updatedtest');
                });
        });
    });
  });
});
