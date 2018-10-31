'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define('AdminUser', {
    Name: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Admin: DataTypes.BOOLEAN
  }, {});
  AdminUser.associate = function(models) {
    // associations can be defined here
  };
  return AdminUser;
};