'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {

    static associate(models) {

      models.cart.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });

      // cart.belongsToMany(models.items, { through: models.cartItem });

      cart.hasMany(models.cartItem, { foreignKey: 'cartId' });


    }
  }
  cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    // name: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};