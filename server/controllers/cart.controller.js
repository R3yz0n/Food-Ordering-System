const express = require('express')
const models = require('../models')


//create the cart for the first time and add an item

const addItemToCart = async (req, res) => {
    const { userId, price, quantity, itemId } = req.body;
    try {
        // Check if the cart already exists for the user
        let cart = await models.cart.findOne({
            where: {
                userId: userId
            }
        });
        console.log('here');

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = await models.cart.create({
                userId: userId,
                quantity: quantity,
                price: 100
            });
        } else {
            // If the cart exists, check if the item already exists
            const existingCartItem = await models.cartItem.findOne({
                where: {
                    cartId: cart.id,
                    itemId: itemId
                }
            });
            console.log(existingCartItem);

            if (existingCartItem) {
                // If the item already exists, update its quantity
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
            } else {
                // If the item doesn't exist, create a new cart item
                await models.cartItem.create({
                    cartId: cart.id,
                    itemId: itemId,
                    quantity: quantity,
                    price: price
                });
            }

            // Update the total quantity of the cart
            cart.quantity += quantity;
            await cart.save();
        }

        res.status(201).json({
            message: 'Cart created successfully.',
            cartId: cart.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to create cart.',
            error: error.message,
        });
    }

};




// const addItemToCart = async (req, res) => {

//     const itemToAdd = {
//         userId: parseInt(req.body.userId),
//         price: parseFloat(req.body.price),
//         quantity: parseInt(req.body.quantity),
//         itemId: parseInt(req.body.itemId),
//     };
//     // console.log(itemToAdd);
//     try {

//         const cartItem = await models.cart.create(itemToAdd);
//         console.log(cartItem);

//         res.status(201).json(cartItem);

//     } catch (error) {

//         res.status(500).json({
//             message: 'Failed to add to cart.',
//             error: error
//         });
//     }


// }

const getCartItems = async (req, res) => {



    try {
        // const cartItems = await models.cart.findOne({
        //     where: { userId: 1 },
        //     // include: { model: models.user, as: 'user' },
        //     // through: 'cartItem',
        //     // include: [
        //     //     { model: models.items }


        //     // ]
        // })
        const items = await models.cart.findOne({
            where: {
                userId: 1
            },
            include: {
                model: models.cartItem

            }



        })

        // console.log(items);


        res.json(items);
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