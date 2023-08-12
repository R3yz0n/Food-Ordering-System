const express = require("express");
const router = express.Router();
const { getSalesReport, getMostOrderedItems } = require("../controllers/report.controller");



router.get('/order', getSalesReport)
router.get('/most-ordered', getMostOrderedItems)
module.exports = router;