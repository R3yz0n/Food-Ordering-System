const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder, getUserAllOrder, getAnOrder, cancelOrder, getAllOrders, completeOrder, getSalesReport } = require("../controllers/order.controller");
const { checkAuthentication } = require("../middlewares/authentication");

router.post("/", checkAuthentication, createOrder);
router.get("/user-orders/:userId", checkAuthentication, getUserAllOrder);
router.get('/:orderId', checkAuthentication, getAnOrder)
router.patch('/cancel/:orderId', checkAuthentication, cancelOrder)
router.patch('/complete/:orderId', checkAuthentication, checkRole, completeOrder)
router.get('/', checkAuthentication, checkRole, getAllOrders)




module.exports = router;

