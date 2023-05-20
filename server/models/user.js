'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false, // Change allowNull to false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Change allowNull to false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Change allowNull to false
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};