'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {

    static associate(models) {


      models.user.hasOne(models.cart, { foreignKey: 'userId', as: 'cart' });


      // models.user.hasMany(models.items, { foreignKey: 'userId' });
    }
  }
  user.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};