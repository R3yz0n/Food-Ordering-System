import React from "react";
import OrderIllustration from "../../assests/OrderIllustration.png";
import { FaRupeeSign } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GiCancel } from "react-icons/gi";
import { AiFillFund } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { motion } from "framer-motion";
import { fadeInOut, pop } from "../../animations";

const OrderStats = ({ userOrders }) => {
  const completedOrdersCount = userOrders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrdersCount = userOrders.filter(
    (order) => order.status === "Cancelled"
  ).length;
  const totalMoneySpent = userOrders.reduce((sum, order) => {
    return order.totalAmount + sum;
  }, 0);

  return (
    <section className=" sm:text-base flex flex-col w-[90%] sm:w-1/2  md:w-[30%] lg:w-[350px]      mx-auto">
      <h2 className="bg-white py-2  lg:px-5 px-8 font-sans  sm:px-4 tracking-wider font-bold text-xl sm:text-lg lg:text-xl order-card rounded-t-lg flex items-center gap-4 text-headingColor  border-gray-300 border-t border-l">
        <ImStatsDots className="text-indigo-700 text-2xl" />
        Order Statistics
      </h2>
      <motion.div
        {...pop}
        className=" bg-[rgb(214,220,229)] px-4 sm:px-1  lg:px-2  rounded-b-md   text-headingColor font-semibold order-card border-gray-300 border font-sans flex flex-col gap-3 py-4 text-[14px] sm:text-[13px] lg:text-[15px] "
      >
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md px-1 lg:px-0 items-center     ">
          <FaRupeeSign className="text-xl text-red-600" />
          <span className="w-40 sm:w-32 lg:w-40   ">Total Money Spent</span>
          {totalMoneySpent}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md px-1 lg:px-0 items-center">
          <VscVerifiedFilled className="text-2xl  text-green-600" />
          <span className="w-48 sm:w-36 lg:w-48">Completed Orders</span>
          {completedOrdersCount}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md px-1 lg:px-0 items-center ">
          <GiCancel className="text-2xl  text-yellow-600" />
          <span className="w-48 sm:w-36 lg:w-48 ">Cancelled Orders</span>
          {cancelledOrdersCount}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md px-1 lg:px-0 items-center">
          <AiFillFund className="text-2xl  text-blue-600" />
          <span className="w-48 sm:w-36 lg:w-48">Total Orders</span>
          {userOrders?.length}
        </h3>
      </motion.div>
      {/* Order Illustation      */}
      <motion.div
        {...fadeInOut}
        className=" h-[320px] w-full bg-[rgb(211,219,231)] food-item-card border-gray-300 border rounded-lg  hidden sm:block"
      >
        <img src={OrderIllustration} className="min-h-full w-full" alt="" />
      </motion.div>
    </section>
  );
};

export default OrderStats;
