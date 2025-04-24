import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    closeTransactionSelectionModal,
    setPaymentMethod,
    openTransactionSelectionModal,
    openTransactionConfirmationModal,
} from "../../store/payment/paymentSlice";
import { IoMdClose } from "react-icons/io";
import { btnClick } from "../../animations";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const TransactionSelectionModal = () => {
    const dispatch = useDispatch();
    const { isTransactionSelectionModalOpen, paymentMethod } = useSelector(
        (state) => state.payment
    );
    const [isMetaMaskLoading, setIsMetaMaskLoading] = React.useState(false);

    if (!isTransactionSelectionModalOpen) return null;

    function closeModal() {
        dispatch(setPaymentMethod(null));

        dispatch(closeTransactionSelectionModal());
    }

    const handleCartPayment = () => {
        toast.error("Card payment is not available");
    };
    const handleConnectMetaMask = async () => {
        setIsMetaMaskLoading(true);
        try {
            if (window.ethereum !== undefined) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                await provider.send("eth_requestAccounts", []);

                const signer = await provider.getSigner();
                await signer.getAddress();

                setIsMetaMaskLoading(false);
                dispatch(closeTransactionSelectionModal());
                dispatch(openTransactionConfirmationModal()); // Open transaction modal after successful connection
            } else {
                toast.error("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            toast.error("Failed to connect wallet");
            // setIsMetaMaskLoading(false);
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
                <h2 className="text-2xl font-bold mb-4 text-headingColor">
                    Select Payment Method
                </h2>
                <div className="space-y-4 pt-4">
                    <button
                        className={`w-full p-3 text-left  bg-gray-100 shadow border rounded-lg transition-colors ${
                            paymentMethod === "card"
                                ? " border-2 border-red-500 text-headingColor"
                                : "text-textColor hover:border-red-500 hover:transition-all hover:scale-105 border-gray-800"
                        }`}
                        onClick={() => dispatch(setPaymentMethod("card"))}
                    >
                        Card (Not available ❌ )
                    </button>

                    <button
                        className={`w-full p-3 text-left  bg-gray-100 shadow border rounded-lg transition-colors ${
                            paymentMethod === "metamask"
                                ? " border-2 border-red-500 text-headingColor"
                                : "text-textColor hover:border-red-500 hover:transition-all hover:scale-105 border-gray-800"
                        }`}
                        onClick={() => dispatch(setPaymentMethod("metamask"))}
                    >
                        MetaMask (Recommended)
                    </button>
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
