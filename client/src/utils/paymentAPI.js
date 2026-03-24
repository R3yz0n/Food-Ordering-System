import axios from "axios";
import { STRIPE_API_URL } from "./constants";

const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const paymentAPI = {
    // Create payment intent
    createPaymentIntent: async (userId, cartId, totalAmount, email) => {
        try {
            const response = await axios.post(
                `${STRIPE_API_URL}/create-payment-intent`,
                {
                    userId,
                    cartId,
                    totalAmount,
                    email,
                },
                getAuthHeaders(),
            );
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || {
                    message: "Failed to create payment intent",
                }
            );
        }
    },

    // Confirm payment (called after card processing in Stripe)
    confirmPayment: async (paymentIntentId, userId, cartId) => {
        try {
            const response = await axios.post(
                `${STRIPE_API_URL}/confirm-payment`,
                {
                    paymentIntentId,
                    userId,
                    cartId,
                },
                getAuthHeaders(),
            );
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || { message: "Failed to confirm payment" }
            );
        }
    },

    // Get payment status
    getPaymentStatus: async (paymentIntentId) => {
        try {
            const response = await axios.get(
                `${STRIPE_API_URL}/status/${paymentIntentId}`,
                getAuthHeaders(),
            );
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || {
                    message: "Failed to fetch payment status",
                }
            );
        }
    },

    // Refund payment
    refundPayment: async (paymentIntentId, orderId) => {
        try {
            const response = await axios.post(
                `${STRIPE_API_URL}/refund`,
                {
                    paymentIntentId,
                    orderId,
                },
                getAuthHeaders(),
            );
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || { message: "Failed to refund payment" }
            );
        }
    },
};
