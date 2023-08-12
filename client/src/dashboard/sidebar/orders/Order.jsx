import React from "react";
import { motion } from "framer-motion";
import { straggerFadeInOut } from "../../../animations";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { AiFillProfile } from "react-icons/ai";

const Order = ({ order, index, handleSelectOrderId }) => {
  const getStatusBadgeClass = (status) => {
    if (status === "Preparing") {
      return "bg-orange-500";
    } else if (status === "Cancelled") {
      return "bg-red-600";
    } else if (status === "Delivered") {
      return "bg-green-700";
    }
    return "";
  };
  return (
    <motion.tr
      {...straggerFadeInOut(index)}
      className="shadow-md border-[3px] font-semibold text-textColor bg-gray-50  border-gray-200 "
    >
      <td className="py-4 px-6 flex items-center">
        <AiFillProfile
          className="text-blue-600 mr-2 text-2xl hover:text-blue-500 hover:scale-105 duration-200 cursor-pointer"
          onClick={() => handleSelectOrderId(order.id)}
        />
        002023{order.id}
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-100 bg-red-500 py-[2px] px-[4px] rounded-full mr-2 text-[12px] h-2 w-5">
          Rs
        </span>
        {order.totalAmount}
      </td>
      <td className="py-4 px-6 text-[15px]">{order?.user.userName}</td>
      <td className="py-4 px-6 text-[15px]">
        {order.user.phoneNumber ? order.user.phoneNumber : "XXXXXXXXXX"}
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => handleSelectOrderId(order.id)}
          className={` px-2 lg:px-3  text-gray-100 py-1 -ml-1 text-xs lg:text-[13px] rounded-md lg:tracking-wider cursor-pointer ${getStatusBadgeClass(
            order?.status
          )}`}
        >
          {order?.status}
        </button>
      </td>
    </motion.tr>
  );
};

export default Order;
