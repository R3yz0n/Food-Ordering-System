import React from "react";
import { BsCartCheckFill } from "react-icons/bs";
import moment from "moment";
import { MdArticle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrderHistory = ({ userOrders, handleSelectOrderId, selectedOrderId }) => {
  const navigate = useNavigate();
  return (
    <section className="h-[570px]  max-h-full    bg-[rgb(227,231,234)] w-[90%] mx-auto sm:w-1/2  lg:w-[400px]  scrollbar-track-black pb-2 rounded-b-lg ">
      <h1 className="font-bold text-center tracking-wide font-sans text-lg   lg:text-xl flex gap-2 items-center food-item-card border bg-white px-7 lg:px-14 rounded-t-md py-2 mb-3 text-headingColor w-full">
        <BsCartCheckFill className="text-blue-950 text-2xl lg:text-3xl  " /> My
        Order History
      </h1>
      <div className=" overflow-y-auto h-full max-h-[500px] ">
        {userOrders?.map((order) => (
          <div
            key={order.id}
            className=" py-2  flex text-[13px] font-sans font-medium px-1  "
          >
            <aside className="mx-auto bg-white rounded-md py-2 border px-3 tracking-wide food-item-card w-[97%] lg:w-[95%] text-opacity-80 text-textColor hover:bg-gray-100 hover:scale-105 duration-200 relative">
              <MdArticle
                className={`absolute hidden md:block right-1 text-[20px] cursor-pointer hover:text-red-600 text-green-700 top-1 ${
                  order.id === selectedOrderId && "text-red-600"
                }`}
                onClick={() => handleSelectOrderId(order.id)}
              />
              <MdArticle
                className={`absolute md:hidden bg-blue right-1 text-[20px] cursor-pointer hover:text-red-600 text-green-700 top-1 `}
                onClick={() => navigate(`/order/${order.id}`)}
              />
              <h1>
                Order Number{" "}
                <span className="cursor-pointer  hover:text-headingColor">
                  #002023{order.id}
                </span>
              </h1>
              {/* <h1>Total Amount: {order.totalAmount}</h1> */}
              <h1>
                Placed on {moment(order.createdAt).format("MMMM Do YYYY")}
              </h1>
            </aside>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;
