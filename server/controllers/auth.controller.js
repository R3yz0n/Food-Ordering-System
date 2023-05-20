const express = require('express');
const models = require('../models')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();





const register = async (req, res) => {


    try {

        //check existing user
        const user = await models.user.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { userName: req.body.userName }
                ]
            }
        });
        // console.log(user);
        console.log('-------------');
        console.log(req.body);

        if (user) {
            // console.log('user exists');
            // status code for useralready exits
            return res.status(409).json({
                message: "User already exists !"
            });
        }

    }
    catch (err) {
        res.status(401).json({
            message: "Something went wrong !",
            error: err
        })

    }



    const salt = await bcrypt.genSalt(10)
    // console.log(typeof (req.body.password));
    // console.log(password);
    const hash = bcrypt.hashSync(req.body.password, salt)

    const userData = { email: req.body.email, userName: req.body.userName, password: hash, role: 'customer' }

    try {
        const user = models.user.create(userData);
        // console.log(user);
        return res.status(200).json({
            message: "Signup sucessfully !",
            user: user.dataValues
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong !",
            error: err
        })

    }



}


const login = async (req, res) => {

    try {

        //check existing user
        // console.log(req.body);

        const user = await models.user.findOne({
            where: { email: req.body.email }

        });
        // console.log(user);
        // console.log(req.body);

        if (!user) {
            return res.status(404).json({ message: "Invalid Credentials." });
        }

        const checkPassword = await bcrypt.compareSync(req.body.password, user.dataValues.password)
        console.log(checkPassword);
        if (!checkPassword)
            return res.status(400).json({ message: "Wrong password ." })

        // if usrnm and pw correct then send jwt toktne
        const token = jwt.sign({ email: user.email, id: user.id, userName: user.userName, image: user.image }, process.env.JWT_SECRET, { expiresIn: '10h' });


        console.log(user.dataValues);
        const { id, email, userName } = user;

        res.status(200).json({ message: "Login sucessfull.", token: token })





    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong !",
            error: err
        })

    }




}
const logout = (req, res) => {
    console.log('222222222222222222');
    res.clearCookie("access_token").status(200).json("User logged out !")


}

module.exports = {
    register: register,
    login: login,
    logout: logout,
}