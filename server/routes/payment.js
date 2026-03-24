const express = require("express");
const router = express.Router();
const { checkAuthentication } = require("../middlewares/authentication");
const {
    createPaymentIntent,
    confirmPayment,
    getPaymentStatus,
    handleWebhook,
    refundPayment,
} = require("../controllers/payment.controller");

// Create payment intent (client needs this to initiate payment)
router.post("/create-payment-intent", checkAuthentication, createPaymentIntent);

// Confirm payment after Stripe card processing
router.post("/confirm-payment", checkAuthentication, confirmPayment);

// Get payment status
router.get("/status/:paymentIntentId", checkAuthentication, getPaymentStatus);

// Stripe webhook (public endpoint, no auth needed)
router.post("/webhook", handleWebhook);

// Refund payment
router.post("/refund", checkAuthentication, refundPayment);

module.exports = router;
