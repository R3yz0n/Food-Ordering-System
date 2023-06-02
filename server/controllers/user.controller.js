const express = require('express')
const { user } = require('../models')



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

module.exports = {
    getAllUsers: getAllUsers
}