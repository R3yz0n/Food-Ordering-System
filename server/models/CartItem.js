'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class cartItem extends Model {
        static associate(models) {

            // models.cart.belongsTo(models.items, { through: models.cartItem });
            // models.items.belongsTo(models.cart, { through: models.cartItem });

            // cartItem.belongsTo(models.cart);
            // cartItem.belongsTo(models.items);
            cartItem.belongsTo(models.cart, { foreignKey: 'cartId' });
            cartItem.belongsTo(models.items, { foreignKey: 'itemId' });



        }


    }

    cartItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
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
            // Additional attributes specific to the association

        },
        {
            sequelize,
            modelName: 'cartItem',
        }
    );
    return cartItem
}



