const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder, getUserAllOrder, getAnOrder, cancelOrder } = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/all/:userId", getUserAllOrder);
router.get('/:orderId', getAnOrder)
router.patch('/cancel/:orderId', cancelOrder)



module.exports = router;

