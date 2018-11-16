'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillingAddress = sequelize.define('BillingAddress', {
    Street: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zipcode: DataTypes.STRING
  }, {});
  BillingAddress.associate = function(models) {
    BillingAddress.belongsTo(models.Order);
  };
  return BillingAddress;
};
