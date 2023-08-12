const express = require('express')
const models = require('../models')
const { Op } = require('sequelize');


const getLatestItems = async (req, res) => {
    // console.log('getting');
    try {
        const now = new Date();
        const twelveHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const totalItems = await models.items.count();

        const latestItems = await models.items.findAll({
            where: {
                createdAt: {
                    [Op.gte]: twelveHoursAgo,
                    [Op.lte]: now,

                },
            },
        });

        const latestItemCount = latestItems.length;
        const percentage = (latestItemCount / totalItems) * 100;

        return res.json({
            totalItems,
            latestItemCount,
            percentage,
        });
    } catch (err) {
        console.log(err.message);
        if (err.name === 'SequelizeDatabaseError') {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
};


const getLatestUsers = async (req, res) => {
    // console.log('getting');
    try {
        const now = new Date();
        const twelveHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const totalUsers = await models.users.count();

        const latestUsers = await models.users.findAll({
            where: {
                createdAt: {
                    [Op.gte]: twelveHoursAgo,
                    [Op.lte]: now,

                },
            },
        });

        const latestUserCount = latestUsers.length;
        const percentage = (latestUserCount / totalUsers) * 100;

        return res.json({
            totalUsers,
            latestUserCount,
            percentage,
        });
    } catch (err) {
        console.log(err.message);
        if (err.name === 'SequelizeDatabaseError') {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

const getLatestOrders = async (req, res) => {
    // console.log('getting');
    try {
        const now = new Date();
        const twelveHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const totalOrders = await models.orders.count();

        const latestUsers = await models.orders.findAll({
            where: {
                createdAt: {
                    [Op.gte]: twelveHoursAgo,
                    [Op.lte]: now,

                },
            },
        });

        const latestOrderCount = latestUsers.length;
        const percentage = (latestOrderCount / totalOrders) * 100;

        return res.json({
            totalOrders,
            latestOrderCount,
            percentage,
        });
    } catch (err) {
        console.log(err.message);
        if (err.name === 'SequelizeDatabaseError') {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
};




module.exports = {
    getLatestItems: getLatestItems,
    getLatestUsers: getLatestUsers,
    getLatestOrders: getLatestOrders
}