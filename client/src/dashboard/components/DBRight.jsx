import React from "react";
import DBHeader from "../navbar/DBHeader";
import { Route, Routes } from "react-router-dom";
import Home from "../sidebar/home/Home";
import Orders from "../sidebar/orders/Orders";
import AddItem from "../sidebar/additem/AddItem";
import Users from "../sidebar/users/Users";
import Items from "../sidebar/items/Items";

const DBRight = () => {
  return (
    <section className=" py-5 px-8 flex-1 bg-[rgb(235,235,235)] overflow-y-auto  max-h-screen relative">
      <DBHeader />

      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/items" element={<Items />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </section>
  );
};

export default DBRight;
