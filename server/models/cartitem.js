'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {

    static associate(models) {

      cartItem.belongsTo(models.cart, { foreignKey: 'cartId' });
      cartItem.belongsTo(models.items, { foreignKey: 'itemId' })
    }
  }
  cartItem.init({

    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart', // Name of the referenced table/model
        key: 'id',      // Name of the referenced column/key
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items', // Name of the referenced table/model
        key: 'id',      // Name of the referenced column/key
      },
    },


  }, {
    sequelize,
    modelName: 'cartItem',
  });

  return cartItem;
};