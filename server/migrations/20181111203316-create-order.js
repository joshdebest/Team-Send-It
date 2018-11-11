'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CustomerName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      DateOrdered: {
        type: Sequelize.DATE
      },
      TrackingNumber: {
        type: Sequelize.STRING
      },
      OrderNumber: {
        type: Sequelize.INTEGER
      },
      Total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};