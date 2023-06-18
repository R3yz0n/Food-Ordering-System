'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class cartItem extends Model {


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



