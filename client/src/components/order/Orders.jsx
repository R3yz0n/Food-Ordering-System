import React, { useEffect, useState } from "react";
import OrderStats from "./OrderStats";
import OrderHistory from "./OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllOrder } from "../../store/order/orderAction";
import SingleOrderDetails from "./SingleOrderDetails";

const Order = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const userId = localStorage.getItem("userId");
      dispatch(getUserAllOrder({ userId }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userOrders.length > 0) {
      setSelectedOrderId(userOrders[0].id); // Initialize with the first order
    }
  }, [userOrders]);

  const handleSelectOrderId = (order) => {
    setSelectedOrderId(order);
  };

  return (
    <section className="min w-full max-h-[750px]   pt-32   pb-6 flex gap-20  ">
      <OrderStats userOrders={userOrders} />
      <SingleOrderDetails selectedOrderId={selectedOrderId} />
      <OrderHistory
        userOrders={userOrders}
        handleSelectOrderId={handleSelectOrderId}
        selectedOrderId={selectedOrderId}
      />
    </section>
  );
};

export default Order;
