const express = require("express");
const router = express.Router();
const { getSalesReport, getMostOrderedItems } = require("../controllers/report.controller");
const { checkAuthentication } = require("../middlewares/authentication");
const { checkRole } = require("../middlewares/role");



router.get('/order', checkAuthentication, checkRole, getSalesReport)
router.get('/most-ordered', checkAuthentication, checkRole, getMostOrderedItems)
module.exports = router;