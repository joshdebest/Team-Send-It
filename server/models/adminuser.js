'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define('AdminUser', {
    Name: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Admin: DataTypes.BOOLEAN
  }, {});
  AdminUser.associate = function(models) {
    AdminUser.hasOne(models.Session);
  };
  return AdminUser;
};
