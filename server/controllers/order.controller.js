const express = require('express')
const models = require('../models')
const { Op } = require('sequelize');


const createOrder = async (req, res) => {
    console.log();
    // Retrieve cart items
    const cartItems = await models.cartItem.findAll({
        where: { cartId: 1 },
        // include: { model: Item }, // Include the associated item
    });
    console.log(cartItems);
    res.json(cartItems)




}

















module.exports = {
    createOrder: createOrder

}