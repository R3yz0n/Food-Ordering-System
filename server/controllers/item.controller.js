const express = require('express')
const { users } = require('../models')

const addItem = (req, res) => {
    // console.log(req.body);
    const itemToCreate = {
        name: req.body.title,
        image: req.body.image,
        price: req.body.description,
        category: req.body.category,
        uid: req.body.uid,
    }
    console.log(1);
    // console.log(user);
    console.log(postToCreate);

    posts.create(postToCreate).then(result => {
        res.status(201).json(
            {
                message: 'Post created sucessfully',
                post: result
            }
        );
        console.log(result);
        // console.log('sucessfull');



    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'SOmething went wrong',
            error: error
        })
    })



}

module.exports = {
    addItem: addItem
}