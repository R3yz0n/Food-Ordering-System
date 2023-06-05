const express = require('express')
const { user } = require('../models')
const models = require('../models')



const getAllUsers = async (req, res) => {

    console.log('got here');

    try {
        const allUsers = await user.findAll(); // Assuming you are using Mongoose for your models
        console.log(allUsers);

        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }




}



const getUser = async (req, res) => {

    try {
        const user = await models.user.findOne({ where: { id: req.params.id } });
        console.log(user);
        if (!user)
            return res.status(404).json({
                message: "User not found.",

            })

        const { createdAt, updatedAt, password, ...others } = user.dataValues;
        res.json(others);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser
}