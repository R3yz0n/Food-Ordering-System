import React from "react";

const Form = () => {
  return (
    <>
      <aside className=" w-full sm:w-2/3 font-sans font-semibold  text-headingColor flex flex-col gap-2  ">

        <div className="flex flex-col md:flex-row gap-2 md:gap-5">

          <aside className="flex flex-col w-full   h-20 gap-1  md:w-[48%]  ">
            <label htmlFor="">Full Name</label>
            <input className=" border-gray-400 bg-gray-50 border rounded focus:outline-transparent px-3 text-base font-normal py-[3px]"  type="text" placeholder="John Doe"/>
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>

          <aside className="flex flex-col  h-20 gap-1  md:w-[48%] ">
            <label htmlFor="">Address</label>
            <input  className=" border-gray-400 bg-gray-50 border rounded focus:outline-transparent px-3 text-base font-normal py-[3px]"  type="text" placeholder="Kalikanagar, Butwal"/>
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>
        </div>

      
          <aside className="flex flex-col gap-1 h-[85px]">
            <label htmlFor="">Email Address</label>
            <input  placeholder="myemailaddress@email.com"  className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none text-base px-3 font-normal"   type="text" />
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>
     

      
              <aside className="flex flex-col h-[85px] gap-1">
            <label htmlFor="">Phone number</label>
            <input placeholder="+97798765432132"   className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none px-3 text-base font-normal"   type="text"   />
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>
        
      </aside>
    </>
  );
};

export default Form;
