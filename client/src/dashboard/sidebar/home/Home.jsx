import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUserAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import CountUp from "react-countup";
import axios from "axios";
import { APIURL } from "../../../utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../store/user/userAction";
import { getAllItems } from "../../../store/product/productAction";
import { clearFields as clearProductFields } from "../../../store/product/productSlice";
import { clearFields } from "../../../store/user/authSlice";
import { getToken } from "../../../store/getToken";
import FoodChart from "./FoodChart";
import Sales from "./Sales";
import LatestUsers from "./LatestUsers";
import PopularFoods from "./PopularFoods";

const Home = () => {
    const [userStats, setUserStats] = useState({});
    const [itemStats, setitemStats] = useState({});
    const [orderStats, setOrderStats] = useState({});
    const dispatch = useDispatch();

    const fetchDatas = async () => {
        try {
            await dispatch(getAllUsers()).unwrap();
            await dispatch(getAllItems()).unwrap();
            dispatch(clearProductFields());
            dispatch(clearFields());

            const userStats = await axios.get(
                `${APIURL}/latest/users`,
                getToken(),
            );
            setUserStats(userStats.data);
            const itemStats = await axios.get(
                `${APIURL}/latest/items`,
                getToken(),
            );
            setitemStats(itemStats.data);
            const orderStats = await axios.get(
                `${APIURL}/latest/orders`,
                getToken(),
            );
            setOrderStats(orderStats.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userId");

                window.location.href = "/login";
                toast.error("You must be logged in.");
            } else {
                console.log(err.message);
                toast.error("Something went wrong.");
            }
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    //   console.log(itemStats);

    return (
        <section className=" pt-10 pb-8 ">
            <aside className="w-full flex justify-evenly py-5 ">
                <Card
                    title="Customers"
                    count={userStats?.totalUsers}
                    latest={userStats?.latestUserCount}
                    per={userStats?.percentage}
                    icon={<FaUserAlt size={28} />}
                    bg="bg-[rgb(178,121,255)]"
                />

                <Card
                    title="Food Item"
                    count={itemStats?.totalItems}
                    latest={itemStats?.latestItemCount}
                    per={itemStats?.percentage}
                    icon={<MdFoodBank size={37} />}
                    bg="bg-[rgb(58,203,232)]"
                />

                <Card
                    title="Orders"
                    count={orderStats?.totalOrders}
                    latest={orderStats?.latestOrderCount}
                    per={orderStats?.percentage}
                    icon={<BsFillCartCheckFill size={32} />}
                    bg="bg-[rgb(255,144,98)]"
                />

                <Card
                    title="Verified Users"
                    count={7}
                    latest={1}
                    per={12}
                    icon={<MdVerified size={33} />}
                    bg="bg-[rgb(245,197,37)]"
                />
            </aside>

            <div className="flex pt-20 lg:gap-24 px-2 xl:px-8">
                <PopularFoods />
                <FoodChart />
            </div>

            <div className="w-full flex  gap-10 pt-10">
                <Sales />
                <LatestUsers />
            </div>
        </section>
    );
};

export default Home;

export const Card = ({ title, latest, bg, icon, count, per }) => {
    // console.log(per);
    return (
        <div
            className={`px-2 pt-3 pb-2 w-52 rounded-xl  ${bg} text-gray-900 flex justify-around  shadow-lg h-28 items-center`}
        >
            <aside className="">
                <p className="text-xl text-gray-900 flex gap-3 items-center  cursor-pointer">
                    {icon}
                    <CountUp
                        className="font-semibold text-2xl cursor-pointer"
                        start={0}
                        end={count}
                    />
                </p>

                <p className="font-semibold mt-4 text-headingColor">{title}</p>
            </aside>

            <aside className="flex flex-col gap-3">
                <CircularProgressbar
                    strokeWidth={15}
                    value={per}
                    className="w-8 h-8  "
                    color="red"
                    styles={buildStyles({
                        pathColor: "white",
                        trailColor: "#4338CA",
                    })}
                />
                <p
                    className="font-bold text-lg cursor-pointer"
                    title="Recenly added"
                >
                    +{latest}
                </p>
            </aside>
        </div>
    );
};
