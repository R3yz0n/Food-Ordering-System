import React, { useEffect } from "react";
import OrderSummary from "./OrderSummary";
import OrderList from "./OrderList";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllOrder } from "../../store/order/orderAction";
import SingleOrder from "./SingleOrder";

const Order = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const userId = localStorage.getItem("userId");
      dispatch(getUserAllOrder({ userId }));
    }
  }, []);

  return (
    <section className="min w-full max-h-[750px]   pt-32   pb-6 flex gap-20  ">
      <OrderSummary userOrders={userOrders} />
      <OrderList userOrders={userOrders} />
      <SingleOrder />
    </section>
  );
};

export default Order;
