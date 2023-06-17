const express = require('express')
const models = require('../models')
const { items } = require('../models/items')
const { user, cart } = require('../models');

const getUserCart = async (userId) => {
    try {
        // Find the user by their ID and include their cart
        const user = await User.findOne({
            where: { id: userId },
            include: Cart,
        });

        if (!user) {
            // User not found
            return null;
        }

        // Retrieve the cart associated with the user
        const cart = user.Cart;

        if (!cart) {
            // User doesn't have a cart
            return null;
        }

        return {
            userId: user.id,
            userName: user.name,
            cartItems: cart.items,
            // Include any other desired user and cart data
        };
    } catch (error) {
        // Handle error
        console.error('Failed to fetch user cart:', error);
        throw error;
    }
};




const addItemToCart = async (req, res) => {

    const itemToAdd = {
        userId: parseInt(req.body.userId),
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        itemId: parseInt(req.body.itemId),
    };
    // console.log(itemToAdd);
    try {

        const cartItem = await models.cart.create(itemToAdd);
        console.log(cartItem);

        res.status(201).json(cartItem);

    } catch (error) {

        res.status(500).json({
            message: 'Failed to add to cart.',
            error: error
        });
    }


}

const getCartItems = async (req, res) => {
    try {
        const cartItems = await models.cart.findAll({
            where: { userId: 1 },
            // include: { model: models.user, as: 'user' },
            through: 'cartItem',
            include: [
                { model: models.items, as: 'items' },

            ]
        });

        res.json(cartItems);
    } catch (error) {
        console.log(error.message);
        // console.error('Failed to fetch cart items:', error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
};























module.exports = {
    addItemToCart: addItemToCart,
    getCartItems: getCartItems

}