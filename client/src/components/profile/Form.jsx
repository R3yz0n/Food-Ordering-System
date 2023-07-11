import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { profileSchema } from "../../schema";

const Form = ({submitHandler}) => {
  const {userData}=useSelector(state=>state.currUser)
  const initialValues = {
    userName: '',
    address: '',
    email:  '',
    phoneNumber:  '',
  };
  // console.log(userData);
  

  const { values, errors, handleBlur, touched, handleChange, handleSubmit,setFieldValue } = useFormik({
    initialValues: initialValues,
    // validationSchema: profileSchema,
    onSubmit: async (values, action) => {
        console.log(values);  
        // const a = await dispatch(userLogin(values)).unwrap()
        // console.log(a);
        submitHandler()


    }

});

useEffect(()=>{
  // console.log(userData);
// console.log(values);
if(userData){
  // set the values of formik with the userData
  setFieldValue("userName", userData?.userName);
  setFieldValue("address", userData?.address);
  setFieldValue("email", userData?.email);
  setFieldValue("phoneNumber", userData?.phoneNumber);
}


},[userData])
// console.log(values);
useEffect(() => {
  console.log(values);

 
}, [values])

  return (
    <>
      <form  className=" w-full sm:w-2/3 font-sans font-semibold  text-headingColor flex flex-col gap-2  " onSubmit={handleSubmit}>

        <div className="flex flex-col md:flex-row gap-2 md:gap-5">

          <aside className="flex flex-col w-full   h-20 gap-1  md:w-[48%]  ">
            <label htmlFor="">Full Name</label>
            <input className=" border-gray-400 bg-gray-50 border rounded focus:outline-transparent px-3 text-base font-normal py-[3px]"  type="text" onChange={handleChange} onBlur={handleBlur}  placeholder="John Doe" required
            name='userName' value={values.userName}/>
            {
              touched.userName && errors.userName &&
              <p className="text-red-500 text-sm font-medium ">{errors.userName}</p>
            }
          </aside>

          <aside className="flex flex-col  h-20 gap-1  md:w-[48%] ">
            <label htmlFor="">Address</label>
            <input  className=" border-gray-400 bg-gray-50 border rounded focus:outline-transparent px-3 text-base font-normal py-[3px]"  type="text" onChange={handleChange} onBlur={handleBlur}  placeholder="Kalikanagar, Butwal"
             name='address' value={values.address}/>
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>
        </div>

      
          <aside className="flex flex-col gap-1 h-[85px]">
            <label htmlFor="">Email Address</label>
            <input  onChange={handleChange} onBlur={handleBlur}  placeholder="myemailaddress@email.com"  className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none text-base px-3 font-normal"
            value={values.email}
            type="text" name='email'/>
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>

      
              <aside className="flex flex-col h-[85px] gap-1">
            <label htmlFor="">Phone number</label>
            <input onChange={handleChange} onBlur={handleBlur}  placeholder="+97798765432132" 
            value={values.phoneNumber}  className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none px-3 text-base font-normal"   type="text" name='phoneNumber'  />
            {/* <p className="text-red-500 text-sm font-medium ">Error</p> */}
          </aside>
        
      </form>
    </>
  );
};

export default Form;
