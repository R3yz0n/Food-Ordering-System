const express = require('express')
const models = require('../models')



const addItemToCart = async (req, res) => {
    const { userId, quantity, itemId } = req.body;
    try {
        let cartExists = await models.cart.findOne({
            where: {
                userId: userId
            }
        });
        const getItem = await models.items.findByPk(itemId, { attributes: ['name'] })
        // console.log(getItem);

        // console.log(cartExists);


        if (!cartExists) {
            await models.sequelize.transaction(async (transaction) => {
                // Create a new cart
                const newCart = await models.cart.create({ userId: userId }, { transaction });

                // Create a new cartItem entry
                const createCartItem = await models.cartItem.create(
                    {
                        cartId: newCart.id,
                        itemId: itemId,
                        quantity: 1,
                    },
                    { transaction }
                );

                // const getItem = await models.items.findByPk(itemId, { attributes: ['name'] })
                // console.log(getItem);

                return res.status(201).json({
                    item: getItem.name
                })
            });
        }
        else {
            const itemInCart = await models.cartItem.findOne({
                where: { cartId: cartExists.id, itemId: itemId },

            })


            console.log(itemInCart);
            // return res.json(itemInCart)

            if (itemInCart) {
                // console.log('here');

                return updateQuantity(req, res)
            } else {
                console.log('here');
                await models.cartItem.create(
                    {
                        cartId: cartExists.id,
                        itemId: itemId,
                        quantity: 1,
                    }
                );

                return res.status(201).json(
                    {
                        item: getItem.name
                    }
                );
            }

        }
    }


    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to create cart.',
            error: error.message,
        });
    }

};




const updateQuantity = async (req, res) => {
    const { cartId, itemId } = req.body;

    try {
        const cartItem = await models.cartItem.findOne({
            where: { cartId: 24, itemId: itemId }
        });

        if (cartItem) {
            // Increment the quantity
            cartItem.quantity += 1;
            await cartItem.save();

            return res.json({ message: 'Quantity incremented.', item: cartItem });
        } else {
            return res.status(404).json({ error: 'Item not found in the cart.' });
        }
    } catch (error) {
        console.error('Error incrementing quantity:', error);
        return res.status(500).json({ error: 'Error incrementing quantity.' });
    }

}



const getCartItems = async (req, res) => {
    console.log(req.params);



    try {

        const items = await models.cart.findOne({
            where: {
                userId: req.params.userId,
            },
            attributes: [],
            include: {
                model: models.cartItem,
                attributes: ['itemId', 'quantity']

            }



        })

        console.log(items);


        res.status(200).json(items.cartItems);
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