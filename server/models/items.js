'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {

    static associate(models) {

      // models.items.belongsTo(models.user, { foreignKey: 'userId' });
      this.belongsToMany(models.cart, { foreignKey: 'cartId', through: 'cartItem', as: 'items' });


    }
  }
  items.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,

    category: {
      type: DataTypes.ENUM,
      values: ['drinks', 'pizzas', 'soups', 'chinese', 'burgers', 'pastas'],
      allowNull: false
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};