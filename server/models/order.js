'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    CustomerName: DataTypes.STRING,
    Email: DataTypes.STRING,
    DateOrdered: DataTypes.DATE,
    TrackingNumber: DataTypes.STRING,
    OrderNumber: DataTypes.INTEGER,
    Status: DataTypes.STRING,
    Total: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    Order.hasOne(models.BillingAddress);
    Order.hasMany(models.Product);
  };
  return Order;
};
