'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    Category: DataTypes.STRING
  }, {});
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};