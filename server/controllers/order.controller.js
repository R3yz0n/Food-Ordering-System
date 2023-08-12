const express = require('express')
const models = require('../models')
const { Op } = require('sequelize');


const createOrder = async (req, res) => {
    const transaction = await models.sequelize.transaction(); // Start a transaction
    // console.log(transaction);
    try {
        console.log(req.body);
        // Retrieve cart items
        const cartItems = await models.cartItem.findAll({
            where: { cartId: req.body.cartId },
            // include: { model: models. },
            attributes: ['itemId', 'quantity']
        });
        // console.log(cartItems);
        // res.json(cartItems)


        const itemIds = cartItems.map((item => item.itemId))
        const allItems = await models.items.findAll({
            where: { id: itemIds },
            attributes: ['id', 'name', 'price', 'image', 'category']
        })

        const itemsWithQuantities = allItems.map(item => {
            const cartItem = cartItems.find(cartItem => cartItem.itemId === item.id);
            return {
                id: item.id,
                price: item.price,
                quantity: cartItem ? cartItem.quantity : 0
            };
        });



        const totalAmount = itemsWithQuantities.reduce((sum, item) => {
            const itemTotal = item.quantity * item.price;
            // console.log(`${item.name} - Price: ${item.price}, Quantity: ${item.quantity}, Total: ${itemTotal}`);
            return sum + itemTotal;
        }, 0);

        // console.log(`Total Amount: ${totalAmount}`);


        // res.json(orderItemsToCreate)
        const order = await models.orders.create({
            userId: req.body.userId,
            totalAmount: totalAmount,
            status: "Preparing"

        }, { transaction })

        const orderItemsToCreate = itemsWithQuantities.map(item => {
            return {
                itemId: item.id,
                orderId: order.id,
                quantity: item.quantity
            }

        }

        )
        const createOrderItems = await models.orderItems.bulkCreate(orderItemsToCreate, { transaction }); //passing transaction
        await models.cart.destroy({
            where: {
                id: req.body.cartId
            }
        })
        await transaction.commit(); // Commit the transaction

        // res.json('okay')
        console.log(createOrderItems);
        res.status(201).json({
            message: "Your order has been placed."
        });
    }
    catch (err) {
        await transaction.rollback(); // Rollback the transaction on error

        console.log(err.message);
        return res.json({
            error: err.message,
            message: 'Failed to place  an order.'


        })
    }









}

const getUserAllOrder = async (req, res) => {


    try {
        // console.log(req.params);
        const userOrders = await models.orders.findAll(

            {
                where: {
                    userId: req.params.userId
                },
                attributes: ['id', 'totalAmount', 'status', 'createdAt'],
                order: [['createdAt', 'DESC']] // Add this line to order by createdAt in descending order

            }
        )


        res.status(200).json(userOrders)



    }
    catch (err) {
        console.log(err.message);
        return res.json({
            error: err.message,
            message: 'Failed to get orders.'


        })

    }

}


const getAnOrder = async (req, res) => {

    try {
        const findOrder = await models.orders.findByPk(req.params.orderId, {
            include: {
                model: models.users,
                attributes: ['userName', 'phoneNumber']
            }
        })
        // return res.json(findOrder)
        // console.log(findOrder);
        if (findOrder === null)
            return res.status(404).json({
                message: "Order not found."
            })
        const status = findOrder.status
        const phoneNumber = findOrder.user.phoneNumber
        const name = findOrder.user.userName
        console.log('--------------------------------');

        const orders = await models.orderItems.findAll({
            where: {
                orderId: req.params.orderId

            },
            attributes: ['quantity'],
            include: {
                model: models.items,
                attributes: ['name', 'price', 'category', 'image']

            }
        })
        // console.log(orders);
        if (!orders.length)
            return res.status(404).json({
                message: "Order not found."
            })



        // return res.json(orders);
        const refactoredOrder = orders.map((order) => {
            const { quantity, item } = order;
            const modifiedItem = {
                ...item.toJSON(), // Convert the Sequelize instance to a plain object
                quantity: quantity // Add the 'quantity' property
            };
            return modifiedItem;
        });

        const totalAmount = refactoredOrder.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity

            return sum + itemTotal
        }, 0)
        // res.json(totalAmount)
        const orderList = refactoredOrder

        return res.status(201).json({
            totalAmount, orderList, status, phoneNumber, name
        })



    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Something went wrong.",
            error: err
        })

    }


}

const cancelOrder = async (req, res) => {

    try {

        const orderDoesExist = await models.orders.findOne({
            where: { id: req.params.orderId }
        })
        console.log(orderDoesExist);
        if (!orderDoesExist)
            return res.status(404).json({
                message: "Order not found."
            })
        // console.log(orderDoesExist);

        if (!(orderDoesExist.status === 'Preparing'))
            return res.status(405).json({
                message: "Order cannot be cancelled."
            })


        const order = await models.orders.findByPk(req.params.orderId)
        // console.log(order);
        const updatedOrder = await models.orders.update({
            status: "Cancelled"
        }, {
            where: {
                id: req.params.orderId
            }
        })
        console.log(updatedOrder)
        if (updatedOrder[0])
            res.status(200).json({
                message: "Order cancelled."
            })
    }
    catch (err) {
        res.json(500).json({
            error: err.message,
            message: "Something went wrong."
        })

    }


}

const completeOrder = async (req, res) => {

    try {

        const orderDoesExist = await models.orders.findOne({
            where: { id: req.params.orderId }
        })
        console.log(orderDoesExist);
        if (!orderDoesExist)
            return res.status(404).json({
                message: "Order not found."
            })
        // console.log(orderDoesExist);

        if (!(orderDoesExist.status === 'Preparing'))
            return res.status(405).json({
                message: "Order cannot be completed."
            })


        const order = await models.orders.findByPk(req.params.orderId)
        // console.log(order);
        const updatedOrder = await models.orders.update({
            status: "Delivered"
        }, {
            where: {
                id: req.params.orderId
            }
        })
        console.log(updatedOrder)
        if (updatedOrder[0])
            res.status(200).json({
                message: "Order Delivered."
            })
    }
    catch (err) {
        res.json(500).json({
            error: err.message,
            message: "Something went wrong."
        })

    }


}



const getAllOrders = async (req, res) => {

    const orders = await models.orders.findAll({
        attributes: ['id', 'status', 'totalAmount'],
        include: {
            model: models.users,
            attributes: ['userName', 'phoneNumber', 'image']
        },
        order: [['createdAt', 'DESC']] // Sort by createdAt in descending order

    })
    res.json(orders)


}













module.exports = {
    createOrder: createOrder,
    getUserAllOrder: getUserAllOrder,
    getAnOrder: getAnOrder,
    cancelOrder: cancelOrder,
    getAllOrders: getAllOrders,
    completeOrder: completeOrder

}