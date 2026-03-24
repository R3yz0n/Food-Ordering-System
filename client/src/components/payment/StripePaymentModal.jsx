import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { btnClick } from "../../animations";
import {
    closeStripePaymentModal,
    setPaymentMethod,
} from "../../store/payment/paymentSlice";
import { clearCartItems, showCart } from "../../store/cart/cartSlice";
import { paymentAPI } from "../../utils/paymentAPI";

const StripePaymentContent = ({ totalPrice, cartId, userId }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const { isStripePaymentModalOpen } = useSelector((state) => state.payment);

    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [cardComplete, setCardComplete] = useState(false);

    // Initialize payment intent after modal is open and required details exist
    useEffect(() => {
        if (!isStripePaymentModalOpen) {
            setClientSecret(null);
            return;
        }

        if (isStripePaymentModalOpen && !clientSecret && email && fullName) {
            initializePayment(email, fullName);
        }
    }, [isStripePaymentModalOpen, clientSecret, email, fullName]);

    const initializePayment = async (customerEmail = email) => {
        try {
            if (!customerEmail || !fullName) {
                toast.error("Please enter email and name first");
                return null;
            }

            const result = await paymentAPI.createPaymentIntent(
                userId,
                cartId,
                totalPrice,
                customerEmail,
            );

            setClientSecret(result.clientSecret);
            return result.clientSecret;
        } catch (error) {
            console.error("Error initializing payment:", error);
            toast.error(error.message || "Failed to initialize payment");
            return null;
        }
    };

    const handleCardChange = (event) => {
        setCardComplete(event.complete);
        if (event.error) {
            // Handle card errors silently - Stripe shows them
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe not loaded");
            return;
        }

        if (!email || !fullName) {
            toast.error("Please enter email and name");
            return;
        }

        if (!cardComplete) {
            toast.error("Please enter complete card details");
            return;
        }

        setIsProcessing(true);

        try {
            let activeClientSecret = clientSecret;

            if (!activeClientSecret) {
                activeClientSecret = await initializePayment(email);
            }

            if (!activeClientSecret) {
                toast.error("Unable to initialize payment. Please try again.");
                setIsProcessing(false);
                return;
            }

            // Create payment method and confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                activeClientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: fullName,
                            email: email,
                        },
                    },
                },
            );

            if (error) {
                toast.error(error.message || "Payment failed");
                console.error("Stripe error:", error);
                setIsProcessing(false);
                return;
            }

            if (
                paymentIntent.status === "succeeded" ||
                paymentIntent.status === "processing"
            ) {
                try {
                    // Confirm with backend
                    const confirmResult = await paymentAPI.confirmPayment(
                        paymentIntent.id,
                        userId,
                        cartId,
                    );

                    dispatch(clearCartItems());
                    dispatch(showCart());
                    dispatch(closeStripePaymentModal());
                    dispatch(setPaymentMethod(null));

                    toast.success(
                        confirmResult.message || "Payment successful!",
                    );
                } catch (error) {
                    toast.error(
                        error.message ||
                            "Order creation failed. Contact support.",
                    );
                }
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.message || "An error occurred during payment");
        } finally {
            setIsProcessing(false);
        }
    };

    const closeModal = () => {
        if (isProcessing) return;
        setClientSecret(null);
        dispatch(closeStripePaymentModal());
        dispatch(setPaymentMethod(null));
    };

    if (!isStripePaymentModalOpen) return null;

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
            },
        },
        hidePostalCode: false,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 relative max-h-[90vh] overflow-y-auto">
                <motion.button
                    {...btnClick}
                    onClick={closeModal}
                    className="absolute top-4 hover:text-red-500 right-4 text-textColor"
                    disabled={isProcessing}
                >
                    <IoMdClose size={28} />
                </motion.button>

                <h2 className="text-2xl font-bold mb-2 text-headingColor">
                    Stripe Payment
                </h2>
                <p className="text-sm text-textColor mb-4">
                    Enter your details and card information to complete the
                    payment
                </p>

                <form onSubmit={handlePayment} className="space-y-3">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-textColor mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            disabled={isProcessing}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-textColor mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            disabled={isProcessing}
                        />
                    </div>

                    {/* Card Element */}
                    <div>
                        <label className="block text-sm font-medium text-textColor mb-1">
                            Card Details
                        </label>
                        <div className="p-3 border border-gray-300 rounded-lg bg-white">
                            <CardElement
                                options={cardElementOptions}
                                onChange={handleCardChange}
                            />
                        </div>
                    </div>

                    {/* Amount Display */}
                    <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg">
                        <div className="flex justify-between">
                            <span className="text-sm text-textColor">
                                Total Amount:
                            </span>
                            <span className="font-semibold text-headingColor">
                                NPR {totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Test Mode Notice */}
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-xs text-blue-800">
                            <strong>Test Mode:</strong> Use card{" "}
                            <code className="bg-blue-100 px-1">
                                4242 4242 4242 4242
                            </code>
                            , any future expiry, any CVC
                        </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        {...btnClick}
                        type="submit"
                        className="mt-6 w-full bg-red-500 text-white py-2 font-semibold rounded-lg hover:bg-red-600 disabled:bg-red-400 disabled:text-gray-100 disabled:cursor-not-allowed"
                        disabled={
                            isProcessing ||
                            !stripe ||
                            !elements ||
                            !cardComplete ||
                            !email ||
                            !fullName ||
                            !clientSecret
                        }
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center">
                                <span className="animate-spin mr-2">⏳</span>
                                Processing Payment...
                            </span>
                        ) : (
                            `Pay NPR ${totalPrice.toFixed(2)}`
                        )}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

// Export wrapped component since we need Stripe and Elements context
export default StripePaymentContent;
