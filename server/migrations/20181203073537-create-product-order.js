'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.FLOAT
      },
      Qty: {
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATE
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Orders',
            key: 'id'
        }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        }
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
    return queryInterface.dropTable('ProductOrders');
  }
};
