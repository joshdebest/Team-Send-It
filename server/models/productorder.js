'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
    Price: DataTypes.FLOAT,
    Qty: DataTypes.INTEGER,
    Date: DataTypes.DATE
  }, {});
  ProductOrder.associate = function(models) {
    ProductOrder.belongsTo(models.Order);
  };
  return ProductOrder;
};
