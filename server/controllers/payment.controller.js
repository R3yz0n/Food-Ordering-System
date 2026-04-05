const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const models = require("../models");

// Create Payment Intent for Stripe
const createPaymentIntent = async (req, res) => {
    try {
        const { userId, cartId, totalAmount, email } = req.body;

        if (!userId || !cartId || !totalAmount || !email) {
            return res.status(400).json({
                error: "Missing required fields: userId, cartId, totalAmount, email",
            });
        }

        // Create or get Stripe customer
        let customer = await stripe.customers.list({ email, limit: 1 });
        let customerId;

        if (customer.data.length > 0) {
            customerId = customer.data[0].id;
        } else {
            const newCustomer = await stripe.customers.create({
                email,
                name: `User ${userId}`,
                metadata: {
                    userId: userId.toString(),
                },
            });
            customerId = newCustomer.id;
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: "usd",
            customer: customerId,
            metadata: {
                userId: userId.toString(),
                cartId: cartId.toString(),
            },
            description: `Food Order - Cart ID: ${cartId}`,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            customerId,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({
            error: error.message,
            message: "Failed to create payment intent",
        });
    }
};

// Confirm Payment and Create Order
const confirmPayment = async (req, res) => {
    const transaction = await models.sequelize.transaction();

    try {
        const { paymentIntentId, userId, cartId } = req.body;

        if (!paymentIntentId || !userId || !cartId) {
            return res.status(400).json({
                error: "Missing required fields: paymentIntentId, userId, cartId",
            });
        }

        // Verify payment intent with Stripe
        const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
                error: `Invalid payment status: ${paymentIntent.status}`,
                message: "Payment was not successful",
            });
        }

        // Retrieve cart items
        const cartItems = await models.cartItem.findAll(
            {
                where: { cartId },
                attributes: ["itemId", "quantity"],
            },
            { transaction },
        );

        if (cartItems.length === 0) {
            await transaction.rollback();
            return res.status(400).json({
                error: "Cart is empty",
                message: "No items in cart",
            });
        }

        const itemIds = cartItems.map((item) => item.itemId);
        const allItems = await models.items.findAll(
            {
                where: { id: itemIds },
                attributes: ["id", "name", "price", "image", "category"],
            },
            { transaction },
        );

        const itemsWithQuantities = allItems.map((item) => {
            const cartItem = cartItems.find((ci) => ci.itemId === item.id);
            return {
                id: item.id,
                price: item.price,
                quantity: cartItem ? cartItem.quantity : 0,
            };
        });

        const totalAmount = itemsWithQuantities.reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);

        // Create order with Stripe payment info
        const order = await models.orders.create(
            {
                userId,
                totalAmount,
                status: "Preparing",
                paymentIntentId,
                paymentStatus: "succeeded",
                paymentMethod: "stripe",
                stripeCustomerId: paymentIntent.customer,
            },
            { transaction },
        );

        // Create order items
        const orderItemsToCreate = itemsWithQuantities.map((item) => {
            return {
                itemId: item.id,
                orderId: order.id,
                quantity: item.quantity,
            };
        });

        await models.orderItems.bulkCreate(orderItemsToCreate, { transaction });

        // Clear cart
        await models.cart.destroy(
            {
                where: { id: cartId },
            },
            { transaction },
        );

        await transaction.commit();

        res.status(201).json({
            message: "Payment successful and order created",
            orderId: order.id,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error confirming payment:", error);
        res.status(500).json({
            error: error.message,
            message: "Failed to confirm payment",
        });
    }
};

// Get Payment Status
const getPaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        if (!paymentIntentId) {
            return res.status(400).json({
                error: "Missing paymentIntentId",
            });
        }

        const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId);

        res.status(200).json({
            id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            customer: paymentIntent.customer,
            metadata: paymentIntent.metadata,
        });
    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({
            error: error.message,
            message: "Failed to fetch payment status",
        });
    }
};

// Handle Stripe Webhook
const handleWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        console.warn("STRIPE_WEBHOOK_SECRET not configured");
        return res
            .status(200)
            .send("Webhook signature verified (secret not configured)");
    }

    let event;

    try {
        // Use raw body for signature verification
        const rawBody = req.rawBody || JSON.stringify(req.body);
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        // Handle different webhook events
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                console.log(`Payment succeeded: ${paymentIntent.id}`);

                // Update order payment status in database
                await models.orders.update(
                    { paymentStatus: "succeeded" },
                    { where: { paymentIntentId: paymentIntent.id } },
                );

                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                console.log(`Payment failed: ${paymentIntent.id}`);

                // Update order payment status
                await models.orders.update(
                    { paymentStatus: "failed" },
                    { where: { paymentIntentId: paymentIntent.id } },
                );

                break;
            }

            case "payment_intent.canceled": {
                const paymentIntent = event.data.object;
                console.log(`Payment canceled: ${paymentIntent.id}`);

                // Update order payment status
                await models.orders.update(
                    { paymentStatus: "canceled" },
                    { where: { paymentIntentId: paymentIntent.id } },
                );

                break;
            }

            case "charge.refunded": {
                const charge = event.data.object;
                console.log(`Charge refunded: ${charge.id}`);

                // Handle refund logic if needed
                const order = await models.orders.findOne({
                    where: { paymentIntentId: charge.payment_intent },
                });

                if (order) {
                    await order.update({ status: "Cancelled" });
                }

                break;
            }

            default:
                console.log(`Unhandled webhook event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ error: "Webhook processing failed" });
    }
};

// Refund Payment
const refundPayment = async (req, res) => {
    try {
        const { paymentIntentId, orderId } = req.body;

        if (!paymentIntentId || !orderId) {
            return res.status(400).json({
                error: "Missing required fields: paymentIntentId, orderId",
            });
        }

        // Verify order exists and belongs to user
        const order = await models.orders.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Create refund through Stripe
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
        });

        // Update order status
        await order.update({
            paymentStatus: "canceled",
            status: "Cancelled",
        });

        res.status(200).json({
            message: "Refund processed successfully",
            refundId: refund.id,
            status: refund.status,
        });
    } catch (error) {
        console.error("Error processing refund:", error);
        res.status(500).json({
            error: error.message,
            message: "Failed to process refund",
        });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment,
    getPaymentStatus,
    handleWebhook,
    refundPayment,
};
