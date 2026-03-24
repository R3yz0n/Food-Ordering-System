import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { btnClick } from "../../animations";
import { closeStripePaymentModal } from "../../store/payment/paymentSlice";
import { createAnOrder } from "../../store/order/orderAction";
import { clearCartItems, showCart } from "../../store/cart/cartSlice";

const StripePaymentModal = ({ totalPrice, cartId, userId }) => {
    const dispatch = useDispatch();
    const { isStripePaymentModalOpen } = useSelector((state) => state.payment);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
    });

    if (!isStripePaymentModalOpen) return null;

    const closeModal = () => {
        if (isProcessing) return;
        dispatch(closeStripePaymentModal());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid =
        formData.name.trim() &&
        formData.email.trim() &&
        formData.cardNumber.trim().length >= 12 &&
        formData.expiryDate.trim() &&
        formData.cvc.trim().length >= 3;

    const handleStripePayment = async () => {
        if (!isFormValid) {
            toast.error("Please fill all payment details correctly");
            return;
        }

        setIsProcessing(true);
        try {
            await dispatch(
                createAnOrder({ cartId, userId, transactionHash: null }),
            ).unwrap();
            dispatch(clearCartItems());
            dispatch(showCart());
            dispatch(closeStripePaymentModal());
            toast.success("Stripe payment submitted successfully");
        } catch (error) {
            toast.error(error?.message || "Stripe payment failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 py-10 w-96 relative">
                <motion.button
                    {...btnClick}
                    onClick={closeModal}
                    className="absolute top-4 hover:text-red-500 right-4 text-textColor"
                    disabled={isProcessing}
                >
                    <IoMdClose size={28} />
                </motion.button>

                <h2 className="text-2xl font-bold mb-4 text-headingColor">
                    Stripe Payment
                </h2>

                <div className="space-y-3 pt-2">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        type="text"
                        name="name"
                        placeholder="Card Holder Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            maxLength={5}
                        />
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                            type="password"
                            name="cvc"
                            placeholder="CVC"
                            value={formData.cvc}
                            onChange={handleChange}
                            maxLength={4}
                        />
                    </div>

                    <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-sm text-textColor">
                        Total Amount:{" "}
                        <span className="font-semibold">NPR {totalPrice}</span>
                    </div>
                </div>

                <motion.button
                    {...btnClick}
                    className="mt-6 w-full bg-red-500 text-white py-2 font-semibold rounded-lg hover:bg-red-600 disabled:bg-red-400 disabled:text-gray-100"
                    onClick={handleStripePayment}
                    disabled={isProcessing}
                >
                    {isProcessing
                        ? "Processing Stripe Payment..."
                        : "Pay with Stripe"}
                </motion.button>
            </div>
        </div>
    );
};

export default StripePaymentModal;
