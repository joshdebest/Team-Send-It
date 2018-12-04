'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AdminUsers', [{
      Name: 'Admin User',
      Username: 'admin@gmail.com',
      Password: 'admin',
      Admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Employee User',
      Username: 'employee@gmail.com',
      Password: 'employee',
      Admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AdminUsers', null, {});
  }
};
