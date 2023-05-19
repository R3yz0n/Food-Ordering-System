import { FormInput } from '../UI';
import FoodBg from '../assests/FoodBg.png'
import React, { useEffect } from 'react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import { useFormik } from 'formik'
import { registrationSchema } from '../schema';
import { motion } from 'framer-motion';
import FoodZone from '../assests/FoodZone.png'
import FoodService from '../assests/FoodService.png'
import { Link } from 'react-router-dom';


const initialValues = { email: '', password: '', userName: '', confirmPassword: '' };




const Register = () => {

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, action) => {
            // console.log(values);

        }

    });

    useEffect(() => {
        console.log(values);

    }, [values])

    return (
        <section className='w-screen min-h-screen  relative overflow-hidden flex  sm:py-5 py-8'>

            {/* background Image */}
            <img src={FoodBg} alt='Food Background Imgg' className='w-full h-full object-fit  absolute top-0 left-0 border-black' />
            <img src={FoodService} alt="Food Servie" className='hidden lg:flex w-80 absolute z-50 top-16 left-[40%]' />

            <aside className='sm:ml-10 flex flex-col bg-yellow-400 shadow-md items-center w-[90%] backdrop-filter min-h-full z-10 sm:w-460 backdrop-blur-3xl p-4 px-4  bg-opacity-20 lg:bg-opacity-100 '>

                {/* //top section */}
                <div className='flex items-center justify-start gap-4 w-full'>

                    <img src={FoodZone} alt="Foodie" className='w-24' />
                    <p className='border-b-2 border-green-700 w-3/4' ></p>



                </div>
                {/* <p className="text-black font-semibold text-3xl -mt-4">Welcome Back</p> */}
                <p className='text-3xl text-black mb-4 font-semibold'>Sign up with following</p>

                {/* input section */}

                <form className='w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4' onSubmit={handleSubmit}>

                    <FormInput placeholder='Username' type='text' icon={<FaUser className='text-xl text-textColor' />}
                        value={values.userName} onChange={handleChange} name='userName' onBlur={handleBlur}
                        errors={errors.userName} touched={touched.userName}
                    />


                    <FormInput placeholder='Email' type='text' icon={<FaEnvelope className='text-xl text-textColor' />}
                        value={values.email} onChange={handleChange} name='email' onBlur={handleBlur}
                        errors={errors.email} touched={touched.email}
                    />


                    <FormInput placeholder='Password' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.password} onChange={handleChange} name='password' onBlur={handleBlur}
                        errors={errors.password} touched={touched.password}
                    />

                    <FormInput placeholder='Confirm Password' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.confirmPassword} onChange={handleChange} name='confirmPassword' onBlur={handleBlur}
                        errors={errors.confirmPassword} touched={touched.confirmPassword}
                    />

                    {/* button section */}

                    <motion.button type='submit' className='w-full px-4 py-2 rounded-md bg-red-600 cursor-pointer text-white text-xl hover:bg-red-500 transition-all'>Signup</motion.button>


                    {/* link section */}

                    <p className='flex gap-2 text-lg'>Already have an account?:
                        <Link to='/login' className='font-semibold'>

                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className='text-red-700 underline cursor-pointer bg-transparent' >Login</motion.button>

                        </Link>
                    </p>




                </form>





            </aside>

        </section>
    );
}

export default Register;
