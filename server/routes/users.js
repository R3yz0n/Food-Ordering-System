const express = require('express');
const router = express.Router();

const { checkAuthentication } = require('../middlewares/authentication')
const { checkRole } = require('../middlewares/role')
const userController = require('../controllers/user.controller')

router.get('/', checkAuthentication, checkRole, userController.getAllUsers)
router.get('/:id', checkAuthentication, userController.getUser)


module.exports = router;