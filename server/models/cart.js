'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {

    static associate(models) {

      this.belongsTo(models.user);
      // this.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
      cart.hasMany(models.items, { foreignKey: 'itemId' });


    }
  }
  cart.init({
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};