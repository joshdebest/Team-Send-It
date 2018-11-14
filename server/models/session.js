'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    Expiration: DataTypes.DATE
  }, {});
  Session.associate = function(models) {
    Session.belongsTo(models.AdminUser);
  };
  return Session;
};
