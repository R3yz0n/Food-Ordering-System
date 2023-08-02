const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder } = require("../controllers/order.controller");

router.post("/:id", createOrder);
router.get("/");

module.exports = router;

