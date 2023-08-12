import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { APIURL } from "../../../utils/constants";
import { toast } from "react-hot-toast";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${APIURL}/report/order`);
      setSalesData(response.data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching sales data:", error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear().toString().slice(-2); // Get last 2 digits of year
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const day = formattedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-6/12 ">
      <LineChart width={400} height={200} data={salesData}>
        <XAxis
          dataKey="date"
          stroke="rgb(80,80,80)"
          tickFormatter={formatDate}
          strokeWidth={2}
          tick={{ fontSize: 12 }} // Decrease XAxis tick font size
        />
        {/* Customize x-axis color */}
        <YAxis
          //   stroke="rgb(142,68,172)"
          stroke="rgb(80,80,80)"
          strokeWidth={2}
          tick={{ fontSize: 12 }} // Decrease YAxis label font size
        />
        <CartesianGrid strokeDasharray="3 3" strokeWidth={2} />
        <Tooltip
          labelStyle={{ fontSize: 12 }}
          contentStyle={{ fontSize: 12 }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalSales"
          stroke="rgb(142,68,172)"
          dot={true} // Optional: Disable dots at data points
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }} // Add margins for padding
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default Sales;
