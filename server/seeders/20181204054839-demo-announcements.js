'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Announcements', [{
      Title: 'Cannondale Synapse NEO gets the all-road e-bike treatment, or SE for quick gravel',
      Message: 'Cannondale’s new Synapse NEO branches out for the brand, expanding into the performance e-road bike market. Yes, gasp! More e-bikes, but again these are pretty well thought out.',
      ImageLink: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Title: 'Santa Cruz V10 29er lands for consumers along with Reserve 29 DH wheels',
      Message: 'It’s been no secret that big wheeled Santa Cruz V10s have been rolling around the World Cup circuit. But until now, the only way to get your hands on one was to be fast enough to race for the Syndicate.',
      ImageLink: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Title: '2019 Focus Izalco Max, lightest production disc brake road bike goes full aero',
      Message: 'Focus has taken to calling their Izalco Max, the “lightest disc road bike in the world”, and now they are making it even faster because #aeroiseverything.',
      ImageLink: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Announcements', null, {});
  }
};
