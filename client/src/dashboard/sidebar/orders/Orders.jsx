import React, { useState } from "react";
import MainLoader from "../../../animations/MainLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "../../../store/order/orderAction";
import Order from "./Order";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import OrderInfo from "./OrderInfo";

const Orders = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const {
    loading,
    allOrders,
    orderInfoById: { status },
  } = useSelector((state) => state.order);
  const [selectOrderId, setSelectOrderId] = useState("");
  const dispatch = useDispatch();

  const hideInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleSelectOrderId = (item) => {
    // console.log(item);
    setSelectOrderId(item);
    setShowInfoModal(true);
  };
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, status]);
  return (
    <>
      <div className="   mt-10 max-h-[80vh] overflow-y-auto scrollbar-thin shadow-lg relative rounded-lg ">
        {loading && <MainLoader />}

        <table className="min-w-full static">
          <thead className="  text-[17px] text-gray-800 shadow-md font-sans bg-[rgb(218,221,228)] ">
            <tr>
              <th className="py-3 px-6 text-left">Order No</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Ordered By</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll max-h-[60vh] scrollbar-track-black  ">
            {allOrders?.length > 0 ? (
              allOrders.map((order, index) => (
                <Order
                  order={order}
                  index={index}
                  handleSelectOrderId={handleSelectOrderId}
                  key={order.id}
                />
              ))
            ) : (
              <motion.tr
                {...fadeInOut}
                className="text-red-700  flex w-full  p-2 text-lg"
              >
                <td className="">{!loading && "No Order Found."}</td>
              </motion.tr>
            )}
          </tbody>
        </table>
        {showInfoModal && (
          <OrderInfo
            hideInfoModal={hideInfoModal}
            selectOrderId={selectOrderId}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
