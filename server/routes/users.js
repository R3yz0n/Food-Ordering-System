const express = require('express');

const { checkAuthentication } = require('../middlewares/authentication')

const router = express.Router();
const { checkRole } = require('../middlewares/role')
const userController = require('../controllers/user.controller')

router.get('/', checkAuthentication, checkRole, userController.getAllUsers)

module.exports = router;