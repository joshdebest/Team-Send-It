'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    CustomerName: DataTypes.STRING,
    Email: DataTypes.STRING,
    DateOrdered: DataTypes.DATE,
    TrackingNumber: DataTypes.STRING,
    OrderNumber: DataTypes.INTEGER,
    Total: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};