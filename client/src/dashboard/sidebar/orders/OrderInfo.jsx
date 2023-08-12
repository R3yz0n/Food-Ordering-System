import React, { useEffect, useState } from "react";
import Overlay from "../../../common/Overlay";
import { APIURL } from "../../../utils/constants";
import { TbListDetails } from "react-icons/tb";
import { motion } from "framer-motion";
import { straggerFadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  completeOrder,
  getOrderById,
} from "../../../store/order/orderAction";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

const OrderInfo = ({ hideInfoModal, selectOrderId }) => {
  const dispatch = useDispatch();
  const { orderInfoById, loading } = useSelector((state) => state.order);
  //   const { userData } = useSelector((state) => state.currUser);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async () => {
    try {
      if (!selectedStatus) {
        toast.error("Please select a status.");
        return;
      }
      console.log(selectedStatus);
      if (selectedStatus === "Cancelled") {
        dispatch(cancelOrder(selectOrderId));

        dispatch(cancelOrder(selectOrderId));
      } else if (selectedStatus === "Delivered") {
        dispatch(completeOrder(selectOrderId));
      }
    } catch (error) {
      // Handle error
    }
  };

  // console.log(selectOrderId);
  useEffect(() => {
    dispatch(getOrderById(selectOrderId));
  }, [selectOrderId, dispatch]);

  return (
    <Overlay onClick={hideInfoModal}>
      <section className="  z-50 w-[700px] h-[600px] bg-gray-200 rounded-md  pb-5 fixed top-0 bottom-0 m-auto left-0 right-0  ">
        {/* No orders */}
        <h2 className="text-lg lg:text-2xl font-semibold text-headingColor px-5  py-2 flex gap-4 w-fit bg-white rounded-tl-md  rounded-br-lg order-card  items-center z-20  ">
          <TbListDetails className="text-gray-200 text-xl lg:text-2xl h-7 w-7 opacity-80 bg-red-600 rounded-sm p-[2px]  tracking-wider" />
          Order Details
          <button
            className="absolute right-3 xs:right-5 bg-white pr-3 pl-1 rounded-md text-[14px] xs:text-base order-card font-sans border border-gray-400 flex gap-1 xs:gap-2 items-center cursor-pointer"
            onClick={hideInfoModal}
          >
            <AiFillCloseCircle className="text-lg text-red-600" />
            Close
          </button>
        </h2>

        <aside className="bg-white mt-4 px-4 w-[96%] rounded-lg mx-auto text-textColor font-medium opacity-95 font-sans pt-3 pb-4 text-[14px] lg:text-[15px] flex gap-2">
          <div className="w-1/2">
            <p className=" flex gap-1">
              <span className="w-36 text-base text-headingColor font-semibold">
                Order Number
              </span>
              #002023{selectOrderId}
            </p>
            <p className=" flex gap-1">
              <span className="w-36 text-base text-headingColor font-semibold">
                Phone Number
              </span>
              {orderInfoById.phoneNumber}
            </p>
            <p className=" flex gap-1">
              <span className="w-36 text-base text-headingColor font-semibold">
                Total Amount
              </span>
              Rs. {orderInfoById.totalAmount}
            </p>
          </div>
          <div className="w-1/2 ">
            <p className=" flex gap-1">
              <span className="w-24 text-base text-headingColor font-semibold">
                Ordered By
              </span>
              {orderInfoById.name}
            </p>

            <div className="w-full flex gap-3 items-center mt-3">
              {orderInfoById.status === "Preparing" && (
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 w-fit text-headingColor bg-gray-200"
                  selected={true}
                  //   hidden={true}
                >
                  <option value="Choose">Choose</option>
                  {!orderInfoById.status ||
                  orderInfoById.status !== "Cancelled" ? (
                    <option value="Cancelled">Cancelled</option>
                  ) : null}
                  {!orderInfoById.status ||
                  orderInfoById.status !== "Delivered" ? (
                    <option value="Delivered">Delivered</option>
                  ) : null}
                </select>
              )}
              {/* button to update status */}
              {orderInfoById.status === "Preparing" && (
                <button
                  disabled={loading}
                  className="bg-green-600 text-white py-[3px] px-3 rounded-md text-sm"
                  onClick={handleStatusChange}
                >
                  Update
                </button>
              )}

              {orderInfoById.status === "Cancelled" && (
                <p className=" gap-1 flex items-center">
                  <span className="w-24 text-[15px] text-headingColor font-semibold">
                    Order Status
                  </span>
                  <button className="bg-red-500 text-white px-3 ml-3 rounded-md py-[2px] text-sm">
                    Cancelled
                  </button>
                </p>
              )}

              {orderInfoById.status === "Delivered" && (
                <p className=" gap-1 flex items-center">
                  <span className="w-24 text-[15px] text-headingColor font-semibold">
                    Order Status
                  </span>
                  <button className="bg-green-600 text-white px-3 ml-3 rounded-md py-[2px] text-sm">
                    Delivered
                  </button>
                </p>
              )}
            </div>
          </div>
        </aside>

        <aside className="grid sm:grid-cols-2  mt-4 px-3 rounded-md gap-3 overflow-y-auto max-h-[400px]  ">
          {orderInfoById?.orderList?.map((orderItem, index) => (
            <motion.div
              {...straggerFadeInOut(index)}
              className="flex items-center   bg-white rounded-md h-min  gap-3 p-[2px] "
              key={index}
            >
              <img
                src={`${APIURL}/file/${orderItem.image}`}
                className=" h-24 object-contain  w-2/5  p-1"
                alt="meal"
              />
              <div className="text-sm font-semibold text-headingColor truncate w-3/5">
                <p className="truncate">{orderItem.name}</p>
                <p className="text-[13px] text-textColor">
                  <span className="text-sm  rounded-full text-headingColor">
                    Rs.
                  </span>{" "}
                  {orderItem.price}
                </p>
                <p className="text-[13px] text-textColor">
                  <span className="text-headingColor">Qty</span>{" "}
                  {orderItem.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </aside>
      </section>
    </Overlay>
  );
};

export default OrderInfo;
