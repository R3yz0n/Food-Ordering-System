import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cancelOrder,
    getOrderById,
    getUserAllOrder,
} from "../../store/order/orderAction";
import { APIURL, chainDetails } from "../../utils/constants";
import { TbListDetails } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";
import { straggerFadeInOut } from "../../animations";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SingleOrderDetails = ({ selectedOrderId }) => {
    const dispatch = useDispatch();
    const { orderInfoById } = useSelector((state) => state.order);
    const { userData } = useSelector((state) => state.currUser);

    // console.log(selectedOrderId);
    useEffect(() => {
        // console.log(selectedOrderId);
        if (selectedOrderId) dispatch(getOrderById(selectedOrderId));
        // console.log(order);
    }, [selectedOrderId, dispatch]);

    const handleCancelOrder = async () => {
        try {
            const unwrappedCancelOrder = await dispatch(
                cancelOrder(selectedOrderId)
            ).unwrap();
            const userId = userData?.id;
            dispatch(getUserAllOrder({ userId }));
            console.log(unwrappedCancelOrder);
        } catch (err) {
            console.log(err);
        }
    };
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
    console.log(orderInfoById);

    return (
        <section className="  hidden  z-10 md:block md:w-[40%]  lg:w-[500px] bg-gray-200 rounded-md  pb-5   ">
            {/* No orders */}
            <h2 className="text-lg lg:text-2xl font-semibold text-headingColor px-5  py-2 flex gap-4 w-fit bg-white rounded-tl-md  rounded-br-lg order-card  items-center z-20  ">
                <TbListDetails className="text-gray-200 text-xl lg:text-2xl h-7 w-7 opacity-80 bg-red-600 rounded-sm p-[2px]  tracking-wider" />
                Order Details
            </h2>
            <aside className="bg-white mt-4 px-4 w-[96%] rounded-lg mx-auto text-textColor font-medium opacity-95 font-sans pt-3 pb-4 text-[14px] lg:text-[15px] ">
                <h5 className="w-full flex gap-1">
                    <span className=" w-28 ">Order Number</span>
                    #002023{selectedOrderId}
                </h5>

                <h5 className="w-full flex gap-1 items-center my-1">
                    <span className="w-28  ">Order Status</span>
                    <span
                        className={` px-2 lg:px-3  text-gray-100 py-[2px] -ml-1 text-xs lg:text-[13px] rounded-lg lg:tracking-wider ${getStatusBadgeClass(
                            orderInfoById?.status
                        )}`}
                    >
                        {orderInfoById?.status}
                    </span>
                </h5>

                <h5 className="w-full flex gap-1">
                    <span className="w-28">Total Amount</span>
                    Rs {orderInfoById.totalAmount} /-
                </h5>

                {orderInfoById?.transactionHash && (
                    <Link
                        target="_blank"
                        to={`${chainDetails.blockExplorerUrls}/tx/${orderInfoById?.transactionHash}`}
                        className="text-blue-500 underline"
                    >
                        View Transaction Details
                    </Link>
                )}

                {orderInfoById?.status === "Preparing" ? (
                    <h4 className="text-xs lg:text-[13px] mt-1 flex items-center gap-3 font-semibold">
                        Do you want to cancel?{" "}
                        <button
                            className="bg-red-500 text-gray-100  px-2 lg:px-3  rounded-lg py-[1px] text-[12px] hover:scale-95 duration-200 hover:bg-red-400"
                            onClick={handleCancelOrder}
                        >
                            Yes
                        </button>{" "}
                    </h4>
                ) : (
                    <h4 className="text-[13px] mt-1 flex items-center gap-3 font-semibold">
                        Rate our food here
                        <span className="flex  text-[16px]">
                            <AiFillStar className="text-yellow-500 cursor-pointer" />
                            <AiFillStar className="text-yellow-500 cursor-pointer" />
                            <AiFillStar className="text-yellow-500 cursor-pointer" />
                            <AiFillStar className="cursor-pointer" />
                            <AiFillStar className="cursor-pointer" />
                        </span>
                    </h4>
                )}
            </aside>
            <aside className="grid lg:grid-cols-2  mt-4 px-3 rounded-md gap-3 overflow-y-auto max-h-[345px]  ">
                {orderInfoById?.orderList?.map((orderItem, index) => (
                    <motion.div
                        {...straggerFadeInOut(index)}
                        className="flex items-center   bg-white rounded-md h-min  gap-2 p-[2px]"
                        key={index}
                    >
                        <img
                            src={`${APIURL}/file/${orderItem.image}`}
                            className=" h-24 object-contain  w-2/5 "
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
    );
};

export default SingleOrderDetails;
