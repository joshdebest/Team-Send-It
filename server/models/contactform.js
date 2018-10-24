'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactForm = sequelize.define('ContactForm', {
    Name: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Email: DataTypes.STRING,
    Message: DataTypes.STRING
  }, {});
  ContactForm.associate = function(models) {
    // associations can be defined here
  };
  return ContactForm;
};