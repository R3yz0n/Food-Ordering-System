const express = require('express');

const authController = require('../controllers/auth.controller')
const { checkAuthentication } = require('../middlewares/authentication')
const { checkRole } = require('../middlewares/role')

const router = express.Router();

router.post('/', checkAuthentication, checkRole)

router.post('/')



module.exports = router;