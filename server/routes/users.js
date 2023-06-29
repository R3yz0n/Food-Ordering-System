const express = require('express');

const { checkAuthentication } = require('../middlewares/authentication')
const { checkRole } = require('../middlewares/role')
const userController = require('../controllers/user.controller')
const router = express.Router();

router.get('/', checkAuthentication, checkRole, userController.getAllUsers)
router.get('/:id', checkAuthentication, userController.getUser)


module.exports = router;