const express = require('express');

const authController = require('../controllers/auth.controller')
const { checkAuthentication } = require('../middlewares/authentication')
const { checkRole } = require('../middlewares/role')
const itemController = require('../controllers/item.controller');
const searchController = require('../controllers/search.controller');
const { getLatestItems } = require('../controllers/latest.controller')

const router = express.Router();

router.get('/', itemController.getAllItems)
router.get('/search/', searchController.searchItems)

router.post('/', checkAuthentication, checkRole, itemController.addItem)
router.delete('/:id', checkAuthentication, checkRole, itemController.deleteItem)
router.put('/:id', checkAuthentication, checkRole, itemController.updateItem)





module.exports = router;