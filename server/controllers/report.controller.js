const models = require('../models')
const sequelize = require('sequelize');

const { Op } = require('sequelize');



const getSalesReport = async (req, res) => {
    console.log('Fetching sales report...');
    try {
        const salesData = await models.orders.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales']
            ],
            where: {
                status: 'Delivered' // Filter by orders with status "Delivered"
            },
            group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
        });

        console.log('Sales data:', salesData);
        res.json(salesData);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            message: "Something went wrong.",
            error: error,
        });
    }
}


const getMostOrderedItems = async (req, res) => {
    try {
        const mostOrdered = await models.orderItems.findAll({
            attributes: [
                'itemId',
                [models.sequelize.fn('COUNT', models.sequelize.col('itemId')), 'orderCount']
            ],
            group: ['itemId'],
            order: [[models.sequelize.col('orderCount'), 'DESC']],
            limit: 4,
            include: [{ model: models.items, attributes: ['name', 'image', 'category'] }]
        });

        // return mostOrdered;
        res.status(200).json(mostOrdered)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            error: error,
        });
    }
};










module.exports = {
    getSalesReport: getSalesReport,
    getMostOrderedItems, getMostOrderedItems
}