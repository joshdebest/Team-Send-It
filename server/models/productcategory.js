'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
  }, {});
  ProductCategory.associate = function(models) {
    ProductCategory.belongsTo(models.Product);
    ProductCategory.belongsTo(models.Category);
  };
  return ProductCategory;
};
