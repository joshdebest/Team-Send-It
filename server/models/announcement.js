'use strict';
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('Announcement', {
    Title: DataTypes.STRING,
    Message: DataTypes.STRING,
    ImageLink: DataTypes.STRING
  }, {});
  Announcement.associate = function(models) {
    // associations can be defined here
  };
  return Announcement;
};