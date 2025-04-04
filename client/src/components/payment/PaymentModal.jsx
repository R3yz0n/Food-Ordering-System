import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closePaymentModal, setPaymentMethod } from "../../store/payment/paymentSlice";

const PaymentModal = () => {
  const dispatch = useDispatch();
  const { isPaymentModalOpen } = useSelector((state) => state.payment);

  if (!isPaymentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          <button
            className="w-full p-3 text-left border rounded-lg hover:bg-gray-100"
            onClick={() => dispatch(setPaymentMethod("card"))}
          >
            Credit/Debit Card
          </button>
          <button
            className="w-full p-3 text-left border rounded-lg hover:bg-gray-100"
            onClick={() => dispatch(setPaymentMethod("upi"))}
          >
            UPI
          </button>
          <button
            className="w-full p-3 text-left border rounded-lg hover:bg-gray-100"
            onClick={() => dispatch(setPaymentMethod("cod"))}
          >
            Cash on Delivery
          </button>
        </div>
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          onClick={() => dispatch(closePaymentModal())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
