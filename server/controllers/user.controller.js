const express = require('express')
const { users } = require('../models')
const models = require('../models')
const { Op } = require('sequelize');



const getAllUsers = async (req, res) => {

    console.log('got here');
    console.log(req.query);
    const { userName } = req.query;
    const query = userName
        ? {
            where: {
                userName: { [Op.startsWith]: userName },
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
        : {};

    try {
        if (req.query.userName === 'all') {
            const allUsers = await users.findAll(
                {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }

                }
            );

            // console.log(allUsers);

            return res.json(allUsers);

        }
        const allUsers = await users.findAll(query);

        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }




}



const getUser = async (req, res) => {

    try {
        const user = await models.users.findOne({
            where: { id: req.params.id },

            attributes: ['id', 'email', 'phoneNumber', 'role', 'address', 'userName', 'image']



        });
        console.log(user);
        if (!user)
            return res.status(404).json({
                message: "User not found.",

            })


        res.json(user);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};










module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser
}