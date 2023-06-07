const express = require('express');

const authController = require('../controllers/auth.controller')
const { checkAuthentication } = require('../middlewares/authentication')
const { checkRole } = require('../middlewares/role')
const itemController = require('../controllers/item.controller')

const router = express.Router();

router.post('/', checkAuthentication, checkRole, itemController.addItem)

router.get('/', itemController.getAllItems)

router.delete('/:id', checkAuthentication, checkRole, itemController.deleteItem)

router.put('/:id', checkAuthentication, checkRole,
    itemController.updateItem
)



module.exports = router;