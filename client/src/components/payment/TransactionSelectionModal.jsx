import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    closeTransactionSelectionModal,
    setPaymentMethod,
    openTransactionConfirmationModal,
    openStripePaymentModal,
} from "../../store/payment/paymentSlice";
import { IoMdClose } from "react-icons/io";
import { SiStripe } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import { btnClick } from "../../animations";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const TransactionSelectionModal = () => {
    const dispatch = useDispatch();
    const { isTransactionSelectionModalOpen, paymentMethod } = useSelector(
        (state) => state.payment,
    );
    const [isMetaMaskLoading, setIsMetaMaskLoading] = React.useState(false);

    if (!isTransactionSelectionModalOpen) return null;

    function closeModal() {
        dispatch(setPaymentMethod(null));

        dispatch(closeTransactionSelectionModal());
    }

    const handleCartPayment = () => {
        dispatch(closeTransactionSelectionModal());
        dispatch(openStripePaymentModal());
    };
    const handleConnectMetaMask = async () => {
        setIsMetaMaskLoading(true);
        try {
            if (window.ethereum !== undefined) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum,
                );
                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();
                await signer.getAddress();

                setIsMetaMaskLoading(false);
                dispatch(closeTransactionSelectionModal());
                dispatch(openTransactionConfirmationModal()); // Open transaction modal after successful connection
            } else {
                toast.error("Please install MetaMask!");
                setIsMetaMaskLoading(false);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            toast.error("Failed to connect wallet");
            setIsMetaMaskLoading(false);
        }
    };
    console.log(isMetaMaskLoading);

    const handleContinuePayment = () => {
        if (paymentMethod === "card") handleCartPayment();
        if (paymentMethod === "metamask") handleConnectMetaMask();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white rounded-lg p-6 py-10 w-96 relative">
                <motion.button
                    {...btnClick}
                    onClick={closeModal}
                    className="absolute top-4  hover:text-red-500 right-4 text-textColor "
                >
                    <IoMdClose size={28} />
                </motion.button>
                <h2 className="text-2xl font-bold mb-6 text-headingColor">
                    Select Payment Method
                </h2>
                <div className="space-y-4 pt-4">
                    {/* Stripe Card Payment Option */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-lg transition-all transform ${
                            paymentMethod === "card"
                                ? "border-2 border-red-500 bg-red-50 shadow-lg"
                                : "border-2 border-gray-200 bg-white hover:border-red-500 hover:shadow-md"
                        }`}
                        onClick={() => dispatch(setPaymentMethod("card"))}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-3 rounded-lg ${
                                    paymentMethod === "card"
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                <SiStripe size={15} />
                            </div>
                            <div className="text-left flex-1">
                                <p
                                    className={`font-semibold text-lg ${
                                        paymentMethod === "card"
                                            ? "text-red-600"
                                            : "text-headingColor"
                                    }`}
                                >
                                    Card
                                    <span className="text-sm text-gray-500 ml-1">
                                        (Visa, Mastercard, Amex)
                                    </span>
                                </p>
                            </div>
                            {paymentMethod === "card" && (
                                <div className="text-red-500">✓</div>
                            )}
                        </div>
                    </motion.button>

                    {/* MetaMask Wallet Payment Option */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-lg transition-all transform ${
                            paymentMethod === "metamask"
                                ? "border-2 border-orange-500 bg-orange-50 shadow-lg"
                                : "border-2 border-gray-200 bg-white hover:border-orange-500 hover:shadow-md"
                        }`}
                        onClick={() => dispatch(setPaymentMethod("metamask"))}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-3 rounded-lg ${
                                    paymentMethod === "metamask"
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                <FaEthereum size={15} />
                            </div>
                            <div className="text-left flex-1">
                                <p
                                    className={`font-semibold text-lg ${
                                        paymentMethod === "metamask"
                                            ? "text-orange-600"
                                            : "text-headingColor"
                                    }`}
                                >
                                    MetaMask
                                    <span className="text-sm text-gray-500 ml-1">
                                        (Crypto Wallet)
                                    </span>
                                </p>
                            </div>
                            {paymentMethod === "metamask" && (
                                <div className="text-orange-500">✓</div>
                            )}
                        </div>
                    </motion.button>
                </div>
                <motion.button
                    {...btnClick}
                    className="mt-4 w-full bg-red-500 text-white py-2 font-semibold rounded-lg hover:bg-red-600 disabled:bg-red-400 disabled:text-gray-100"
                    onClick={handleContinuePayment}
                    disabled={!paymentMethod || isMetaMaskLoading}
                >
                    {paymentMethod === "card"
                        ? "Pay with Card"
                        : paymentMethod === "metamask"
                          ? isMetaMaskLoading
                              ? "Connecting MetaMask..."
                              : "Connect MetaMask"
                          : "Continue"}
                </motion.button>
            </div>
        </div>
    );
};

export default TransactionSelectionModal;
