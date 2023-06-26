const express = require('express');
const router = express.Router();



const { getLatestItems } = require('../controllers/latest.controller')
const { getLatestUsers } = require('../controllers/latest.controller')


router.get('/users', getLatestUsers)
router.get('/items', getLatestItems)



module.exports = router;