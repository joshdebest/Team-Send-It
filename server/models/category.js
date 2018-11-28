'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    Name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.belongsToMany(models.Product, { through: models.ProductCategory });
  };
  return Category;
};
