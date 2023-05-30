const express = require('express')
const { users, items } = require('../models')

const addItem = (req, res) => {
    // console.log(req.body);
    const itemToCreate = {
        name: req.body.title,
        image: req.body.image,
        price: req.body.description,
        category: req.body.category,
        userId: req.body.userId,
    }
    console.log(1);
    // console.log(user);
    console.log(itemToCreate);

    items.create(itemToCreate).then(result => {
        res.status(201).json(
            {
                message: 'Item uploaded sucessfully',
                // item: result
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

const deleteItem = async (req, res) => {


    try {
        const itemToDelete = await items.destroy({
            where: { id: req.params.id }
        })
        console.log(itemToDelete);
        if (itemToDelete)
            res.status(200).json({ message: "Deleted sucessfully." })
        console.log(itemToDelete);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        })

    }



}



const getAllItems = async (req, res) => {

    try {

        // const query = req.query.category ? { where: { category: req.query.category } } : {};
        console.log('----------');
        // console.log(query);

        const allItems = await items.findAll();
        res.json(allItems);

    } catch (err) {
        if (err.name === 'SequelizeDatabaseError') {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }


}

module.exports = {
    addItem: addItem,
    getAllItems: getAllItems,
    deleteItem: deleteItem
}