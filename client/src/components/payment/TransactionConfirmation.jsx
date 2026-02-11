import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { btnClick } from "../../animations";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { closeTransactionConfirmationModal } from "../../store/payment/paymentSlice";
import usdtAbi from "../../abis/usdtAbi";
import {
    chainDetails,
    receiverAddress,
    usdtContractAddress,
} from "../../utils/constants";
import { Link } from "react-router-dom";
import { clearCartItems, showCart } from "../../store/cart/cartSlice";
import { createAnOrder } from "../../store/order/orderAction";

const TransactionConfirmation = ({ totalPrice, cartId, userId }) => {
    const dispatch = useDispatch();
    const [isTransactionLoading, setIsTransactionLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [usdtBalance, setUsdtBalance] = useState("0");
    const [conversionRate, setConversionRate] = useState(null);
    const [isLoadingRate, setIsLoadingRate] = useState(true);
    const [transactionHash, setTransactionHash] = useState(null);
    const { isTransactionConfirmationModalOpen } = useSelector(
        (state) => state.payment,
    );

    // Fetch real-time conversion rate and wallet info
    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await fetch(
                    "https://api.exchangerate-api.com/v4/latest/NPR",
                );
                const data = await response.json();
                const usdRate = data.rates.USD;
                setConversionRate(usdRate);
                setIsLoadingRate(false);
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
                setConversionRate(1 / 133);
                setIsLoadingRate(false);
                toast.error("Using approximate conversion rate");
            }
        };

        const fetchWalletInfo = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainDetails.chainId }],
                    });
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum,
                    );
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setWalletAddress(address);

                    const usdtContract = new ethers.Contract(
                        usdtContractAddress,
                        usdtAbi,
                        provider,
                    );

                    const decimals = await usdtContract.decimals();
                    const balance = await usdtContract.balanceOf(address);
                    setUsdtBalance(ethers.utils.formatUnits(balance, decimals));
                } catch (error) {
                    console.error("Error fetching wallet info:", error);
                    toast.error("Failed to connect to wallet");
                }
            }
        };

        if (isTransactionConfirmationModalOpen) {
            fetchConversionRate();
            fetchWalletInfo();
        }
    }, [isTransactionConfirmationModalOpen]);

    if (!isTransactionConfirmationModalOpen) return null;

    function closeModal() {
        dispatch(closeTransactionConfirmationModal());
    }

    const handleTransaction = async () => {
        try {
            if (window.ethereum !== undefined) {
                setIsTransactionLoading(true);
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum,
                );
                const signer = provider.getSigner();

                // Get the USDT contract instance with signer
                const usdtContract = new ethers.Contract(
                    usdtContractAddress,
                    usdtAbi,
                    signer,
                );

                // Convert USD amount to USDT amount with proper decimals
                const decimals = await usdtContract.decimals();
                const amountToSend = ethers.utils.parseUnits(
                    usdAmount.toString(),
                    decimals,
                );

                // Send the transaction
                const tx = await usdtContract.transfer(
                    receiverAddress,
                    amountToSend,
                );
                setTransactionHash(tx.hash);
                console.log(tx);

                // Wait for transaction confirmation
                const transactionDetails = await tx.wait(1);
                try {
                    let transactionHash = tx.hash;
                    const order = await dispatch(
                        createAnOrder({ cartId, userId, transactionHash }),
                    ).unwrap();
                    dispatch(clearCartItems());
                    dispatch(showCart());
                } catch (error) {
                    console.log(error);
                    console.log(error.message);
                }

                closeModal();

                toast.success(
                    <span>
                        Check transaction details{" "}
                        <Link
                            target="_blank"
                            to={`${chainDetails.blockExplorerUrls}/tx/${transactionDetails.transactionHash}`}
                            className="text-blue-500 underline"
                        >
                            here
                        </Link>
                    </span>,
                    {
                        duration: 8000,
                    },
                );

                setIsTransactionLoading(false);
            } else {
                toast.error("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed: " + error.message);
            setIsTransactionLoading(false);
        }
    };

    // Convert NPR to USD using real-time rate
    const convertToUSD = (nprAmount) => {
        if (!conversionRate) return "0.00";
        return (nprAmount * conversionRate).toFixed(2);
    };

    const usdAmount = convertToUSD(totalPrice);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white rounded-lg py-10 p-6 w-96 relative">
                <motion.button
                    {...btnClick}
                    onClick={closeModal}
                    className="absolute top-4 hover:text-red-500 right-4 text-textColor"
                >
                    <IoMdClose size={28} />
                </motion.button>
                <h2 className="text-2xl font-bold mb-4 text-headingColor">
                    Confirm Transaction
                </h2>

                {/* Wallet Info Section with USDT Balance */}
                <div className="p-3 rounded-lg mb-4 bg-gray-100 border border-gray-400 ">
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">
                            Connected Wallet:
                        </span>
                        <span className="text-sm font-medium">
                            {walletAddress
                                ? `${walletAddress.substring(
                                      0,
                                      8,
                                  )}....${walletAddress.substring(
                                      walletAddress.length - 6,
                                  )}`
                                : "Not connected"}
                        </span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">
                            USDT Balance:
                        </span>
                        <span className="text-sm font-medium">
                            {usdtBalance} (USDT)
                        </span>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="bg-gray-100 border border-gray-400 p-4 rounded-lg">
                        <p className="text-textColor font-semibold mb-2">
                            Transaction Details
                        </p>
                        <div className="flex justify-between mb-2">
                            <span>Amount in NPR:</span>
                            <span className="font-medium">
                                NPR {totalPrice}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Amount to pay (USD):</span>
                            <span className="font-medium">
                                {isLoadingRate
                                    ? "Loading..."
                                    : `${usdAmount} USDT`}
                            </span>
                        </div>
                        {!isLoadingRate &&
                            Number.parseFloat(usdtBalance) <
                                Number.parseFloat(usdAmount) && (
                                <p className="text-red-500">
                                    Insufficient balance
                                </p>
                            )}
                        {isLoadingRate && (
                            <p className="text-gray-500 text-sm">
                                Fetching current exchange rate...
                            </p>
                        )}
                    </div>
                </div>
                <motion.button
                    {...btnClick}
                    className="mt-6 w-full bg-red-500 text-white py-2 font-semibold rounded-lg hover:bg-red-600 disabled:bg-red-400 disabled:text-gray-100"
                    onClick={handleTransaction}
                    disabled={
                        isTransactionLoading ||
                        Number.parseFloat(usdtBalance) <
                            Number.parseFloat(usdAmount) ||
                        isLoadingRate
                    }
                >
                    {isTransactionLoading ? "Processing..." : "Pay with USDT"}
                </motion.button>
            </div>
        </div>
    );
};

export default TransactionConfirmation;
