import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../assests/Avatar.png";
import Form from "./Form";
import { btnClick } from "../../animations";
import { motion } from "framer-motion";

const Profile = () => {
  const { userData } = useSelector((state) => state.currUser);
  const [isEdit,setIsEdit]=useState(false)

  const handleEdit =()=>{
    setIsEdit(!isEdit)
  
  
  }

  return (
    <main className=" pt-28 sm:pt-40  w-full h-auto sm:h-screen pb-8 bg-gray-100 px-8 md:px-0 b">
      <section className=" flex flex-col gap-3 sm:flex-row justify-center sm:gap-20  mx-auto py-10 px-5 bg-[rgb(235,240,248)] md:w-[750px] lg:w-[800px] rounded-lg  profilecard">
        <div className="h-[95%]">
          <img src={Avatar} alt="Avatar" className="w-40 h-40 mx-auto" />

        <motion.button {...btnClick} className=" bg-red-500 px-7 py-1 text-white rounded-sm font-medium mt-8 flex mx-auto hover:bg-red-600" onClick={handleEdit}>

      {
        isEdit? <span>Edit Profile</span>: <span>Update Profile</span>
      }

          </motion.button>
       
            
        </div>
        <Form />
      </section>
    </main>
  );
};

export default Profile;
