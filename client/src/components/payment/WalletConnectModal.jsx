import React from "react";
import { motion } from "framer-motion";
import { ethers } from 'ethers';

const WalletConnectModal = ({ onConnect, onClose }) => {
  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      onConnect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Please connect your MetaMask wallet to proceed with the payment
          </p>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={connectWallet}
          >
            Connect MetaMask
          </button>
        </div>
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletConnectModal;