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


<<<<<<< HEAD
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
=======
    }
  }
  cart.init({
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // itemId: DataTypes.INTEGER
>>>>>>> main
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};