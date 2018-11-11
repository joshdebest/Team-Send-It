'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    Name: DataTypes.STRING,
    Price: DataTypes.FLOAT,
    Qty: DataTypes.INTEGER,
    Description: DataTypes.STRING,
    ImageLink: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};