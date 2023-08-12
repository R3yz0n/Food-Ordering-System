import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";

const FoodChart = () => {
  const { items } = useSelector((state) => state.product);
  return (
    <main className=" w-min mb-7  ">
      <section className="flex  relative pt-5">
        <p className="text-gray-200 text-2xl absolute top-0 font-semibold left-0 -mt-6 px-3 py-1 shadow-lg bg-orange-600 rounded-lg">
          Food Categories
        </p>
        <aside className="flex flex-col gap-1 mt-3   ">
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[rgb(255,99,132)]"></p>
            Drinks
          </div>
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[#36A2EB]"></p>Pizza
          </div>
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[#FFCE56]"></p>Soups
          </div>
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[#8E44AD]"></p>Burgers
          </div>
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[#34992B]"></p>Chinese
          </div>
          <div className="flex gap-2">
            {" "}
            <p className="w-5 h-5 rounded-full  bg-[rgb(111,3,84)]"></p>Pasta
          </div>
        </aside>

        <PieChartt width={100} height={200} items={items} className="" />
      </section>
    </main>
  );
};

export default FoodChart;

const PieChartt = ({ items }) => {
  // Create an object to store the category totals
  const categoryTotals = {};

  // Calculate the total count for each category
  items.forEach((item) => {
    const { category } = item;
    if (category in categoryTotals) {
      categoryTotals[category]++;
    } else {
      categoryTotals[category] = 1;
    }
  });

  // Convert the category totals object into an array of data for the pie chart
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  // Define the colors for the pie chart
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8E44AD",
    "#34992B",
    "rgb(111,3,84)",
  ];

  return (
    <PieChart width={300} height={200} className="">
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
