'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {

    static associate(models) {

      items.belongsToMany(models.cart, { through: models.cartItem });

      items.hasMany(models.cartItem, { foreignKey: 'itemId' });



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