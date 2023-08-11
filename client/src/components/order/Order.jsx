import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrderById } from "../../store/order/orderAction";
import { APIURL } from "../../utils/constants";
import { TbListDetails } from "react-icons/tb";
import { AiFillBackward, AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { clearFields } from "../../store/order/orderSlice";

const Order = ({ selectedOrderId }) => {
  const dispatch = useDispatch();
  const { orderInfoById, error } = useSelector((state) => state.order);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderById(params.id));
  }, [dispatch, params]);
  useEffect(() => {
    if (window.innerWidth > 768) {
      navigate(-1);
    }
    if (error) {
      navigate(-1);
      dispatch(clearFields());
    }
  }, [error, dispatch, navigate]);

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder(params.id)).unwrap();
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

  return (
    <section className=" md:w-[280px] md:hidden min-h-screen  bg-gray-200 rounded-md  pb-5 pt-28  px-4">
      <h2 className="text-lg lg:text-2xl font-semibold text-headingColor px-5  py-2 flex gap-4 w-fit bg-white rounded-tl-md  rounded-br-lg order-card  items-center z-20   ml-5">
        <TbListDetails className="text-gray-200 text-xl lg:text-2xl h-7 w-7 opacity-80 bg-red-600 rounded-sm p-[2px]  tracking-wider" />
        Order Details
        <button
          className="absolute right-3 xs:right-5 bg-white pr-3 pl-1 rounded-md text-[14px] xs:text-base order-card font-sans border border-gray-400 flex gap-1 xs:gap-2 items-center"
          onClick={() => navigate(-1)}
        >
          <AiFillBackward className="text-lg" />
          Back
        </button>
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
          <span className="w-28">Sub Total Rs.</span>
          {orderInfoById.totalAmount} /-
        </h5>

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
      <aside className="grid xs:grid-cols-1 sm:grid-cols-2  mt-4 px-3 rounded-md gap-3  ">
        {orderInfoById?.orderList?.map((orderItem, index) => (
          <div
            className="flex items-center   bg-white rounded-md h-min gap-4 xs:gap-5 p-1"
            key={index}
          >
            <img
              src={`${APIURL}/file/${orderItem.image}`}
              className=" h-28  xs:h-32 object-contain w-28 pl-2 xs:w-32"
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
          </div>
        ))}
      </aside>
    </section>
  );
};

export default Order;
