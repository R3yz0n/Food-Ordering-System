const express = require('express')
const models = require('../models')


//create the cart for the first time and add an item
const addItemToCart = async (req, res) => {
    const { userId, quantity, itemId } = req.body;
    // console.log(req.body);
    console.log(quantity);

    try {

        const item = await models.items.findByPk(itemId);
        if (!item) {
            throw new Error('Item not found.');
        }


        const cart = await models.cart.create(
            {
                userId: 1,
                itemId: 1,
                quantity: 1,
                price: 100,

            },
            {
                include: [
                    {
                        model: models.items,
                    },
                ],
            }


        );
        // console.log(cart);

        // console.log(item);

        const a = await cart.addItem(item);
        // console.log(a);
        console.log(cart);

        res.status(201).json({
            message: 'Item added to cart successfully.',
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to add item to cart.',
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

    let a = models.cartItem.associations;
    console.log(a);
    return res.json(1)

    try {
        const cartItems = await models.cart.findOne({
            where: { userId: 1 },
            // include: { model: models.user, as: 'user' },
            // through: 'cartItem',
            // include: [
            //     { model: models.items }


            // ]
        })

        console.log(await cartItems.getItems());

        // res.json(cartItems);
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