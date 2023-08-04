const express = require('express')
const models = require('../models')
const { Op } = require('sequelize');


const createOrder = async (req, res) => {
    console.log();
    // Retrieve cart items
    const cartItems = await models.cartItem.findAll({
        where: { cartId: 1 },
        // include: { model: models. },
        attributes: ['itemId', 'quantity']
    });
    console.log(cartItems);
    // res.json(cartItems)


    const itemIds=cartItems.map((item=>item.itemId))
    const allItems=await models.items.findAll({
        where:{id:itemIds},
        attributes:['id', 'name','price','image','category']
    })

    console.log(allItems);
    return res.json(allItems)
    // const order = await models.order.create(
    //     {
    //         userId: 1,
    //         totalAmount: 1
    //     }
    // )


    const orderItems = await models.orderItems.create




}

















module.exports = {
    createOrder: createOrder

}