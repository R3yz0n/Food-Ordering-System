import { motion } from "framer-motion";
import React from "react";
import { APIURL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { straggerFadeInOut } from "../../../animations";
import Avatar from "../../../assests/Avatar.png";

const LatestUsers = () => {
  const { usersList } = useSelector((state) => state.user);
  return (
    <section className="min-w-[300px] ">
      <p className="text-headingColor font-semibold text-xl px-4 mb-3  font-sans">
        Latest Registered Users
      </p>

      <div className="bg-gray-50 shadow-md max-w-[430px] py-4 px-7 flex gap-7 rounded-3xl border-gray-300 ">
        {usersList?.slice(0, 5).map((user, index) => (
          <motion.div {...straggerFadeInOut(index)} key={usersList?.id}>
            <img
              src={user?.image ? `${APIURL}/file/${user.image}` : Avatar}
              className="w-12 h-12 rounded-full"
              alt="user"
            />
            <p className="text-textColor font-semibold font-sans text-sm text-center">
              {user?.userName.split(" ")[0]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestUsers;
