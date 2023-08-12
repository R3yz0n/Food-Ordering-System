const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder, getUserAllOrder, getAnOrder, cancelOrder, getAllOrders, completeOrder } = require("../controllers/order.controller");
const { checkAuthentication } = require("../middlewares/authentication");

router.post("/", checkAuthentication, createOrder);
router.get("/user-orders/:userId", checkAuthentication, getUserAllOrder);
router.get('/:orderId', checkAuthentication, getAnOrder)
router.patch('/cancel/:orderId', checkAuthentication, cancelOrder)
router.patch('/complete/:orderId', checkAuthentication, completeOrder)
router.get('/', getAllOrders)



module.exports = router;

