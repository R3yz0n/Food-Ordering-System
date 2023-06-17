const express = require('express');
const { checkAuthentication } = require('../middlewares/authentication');
const { addItemToCart, getCartItems } = require('../controllers/cart.controller');

const router = express.Router();

router.post('/', checkAuthentication, addItemToCart)
router.get('/:userId', checkAuthentication, getCartItems)



module.exports = router;