'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    Name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product);
  };
  return Category;
};
