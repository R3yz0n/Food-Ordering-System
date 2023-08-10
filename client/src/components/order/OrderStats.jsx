import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllOrder } from "../../store/order/orderAction";
import OrderIllustration from "../../assests/OrderIllustration.png";
import { FaRupeeSign } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GiCancel } from "react-icons/gi";
import { AiFillFund } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";

const OrderStats = ({ userOrders }) => {
  const completedOrdersCount = userOrders.filter(
    (order) => order.status === "Completed"
  ).length;
  const cancelledOrdersCount = userOrders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  return (
    <section className="text-base flex flex-col   w-[350px]  pl-8   ">
      <h2 className="bg-white py-2  px-5 font-sans tracking-wider font-bold text-xl order-card rounded-t-lg flex items-center gap-4 text-headingColor  border-gray-300 border-t border-l">
        <ImStatsDots className="text-indigo-700 text-2xl" />
        Order Statistics
      </h2>
      <div className=" bg-[rgb(214,220,229)]  px-3 rounded-b-md   text-headingColor font-semibold order-card border-gray-300 border font-sans flex flex-col gap-3 py-4 text-[15px] ">
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md  items-center  ">
          <FaRupeeSign className="text-xl text-red-600" />
          <span className="w-48">Total Money Spent</span>
          {completedOrdersCount}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md items-center">
          <VscVerifiedFilled className="text-2xl  text-green-600" />
          <span className="w-48">Completed Orders</span>
          {completedOrdersCount}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md items-center ">
          <GiCancel className="text-2xl  text-yellow-600" />
          <span className="w-48 ">Cancelled Orders</span>
          {cancelledOrdersCount}
        </h3>
        <h3 className="flex py-1 opacity-80 gap-2 justify-center  bg-white rounded-md items-center">
          <AiFillFund className="text-2xl  text-blue-600" />
          <span className="w-48">Total Orders</span>
          {completedOrdersCount}
        </h3>
      </div>
      {/* Order Illustation      */}
      <div className=" h-[320px] w-full bg-[rgb(211,219,231)] food-item-card border-gray-300 border rounded-lg ">
        <img src={OrderIllustration} className="min-h-full w-full" alt="" />
      </div>
    </section>
  );
};

export default OrderStats;
