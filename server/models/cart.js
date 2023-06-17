'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {

    static associate(models) {

      models.cart.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });


      models.cart.belongsToMany(models.items, { foreignKey: 'cartId', through: 'cartItem', required: true });





    }
  }
  cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};