import { FormInput } from '../UI';
import FoodBg from '../assests/FoodBg.png'
import React, { useEffect, useState } from 'react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import { useFormik } from 'formik'
import { loginSchmea, registrationSchema } from '../schema';
import { motion } from 'framer-motion';
import FoodZone from '../assests/FoodZone.png'
import FoodService from '../assests/FoodService.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIURL } from '../APIURL';
import { useDispatch } from 'react-redux'
import { addToken } from '../store/slices/userSlice';

const initialValues = { email: '', password: '' };



const Login = () => {
    const navigate = useNavigate('')
    const dispatch = useDispatch()

    const [response, setResponse] = useState('')

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        // validationSchema: loginSchmea,
        onSubmit: async (values, action) => {
            // console.log(values);

            try {

                const res = await axios.post(`${APIURL}/auth/login`, values)
                console.log(res);
                dispatch(addToken(res.data.token))
                // console.log(res.data.token);
                setResponse(res.data.message)
                // navigate('/', { replace: true })

            }
            catch (error) {
                // console.log(error);
                // setResponse(error.response.data.message)

            }

        }

    });

    useEffect(() => {
        // console.log(values);
        setResponse('')

    }, [values])

    return (
        <section className='w-screen  min-h-screen relative overflow-hidden flex  py-10 sm:py-8'>

            {/* background Image */}
            <img src={FoodBg} alt='Food Background Imgg' className='w-full h-full object-fit  absolute top-0 left-0 border-black blur-[2px]' />
            <img src={FoodService} alt="Food Servie" className='hidden lg:flex w-80 absolute z-50 top-16 left-[40%]' />

            <aside className='sm:ml-10 flex flex-col bg-yellow-400 shadow-md items-center w-[90%] backdrop-filter min-h-full z-10 sm:w-460 backdrop-blur-xl p-4 px-4 bg-opacity-20 lg:bg-opacity-100 '>

                {/* //top section */}
                <div className='flex items-center justify-start gap-4 w-full mb-4  sm:mb-2'>

                    <img src={FoodZone} alt="Foodie" className='w-28' />
                    <p className='border-b-2 border-green-700 w-3/4' ></p>



                </div>
                <p className="text-black font-semibold text-3xl">Welcome Back!</p>
                <p className='text-xl text-textColor mb-4 mt-1 font-semibold'>Login with following</p>

                {/* input section */}

                <form className='w-full flex flex-col items-center justify-center gap-[15px] px-4 md:px-12 py-4' onSubmit={handleSubmit}>


                    <FormInput placeholder='Email' type='text' icon={<FaEnvelope className='text-xl text-textColor' />}
                        value={values.email} onChange={handleChange} name='email' onBlur={handleBlur}
                        errors={errors.email} touched={touched.email}
                    />



                    <FormInput placeholder='Password' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.password} onChange={handleChange} name='password' onBlur={handleBlur}
                        errors={errors.password} touched={touched.password}
                    />


                    {/* button section */}

                    {response.length > 1 &&
                        <motion.div className='-mt-6 text-red-600' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                            {response}
                        </motion.div>
                    }

                    <motion.button type='submit' className='w-full px-4 py-2 rounded-md bg-red-600 cursor-pointer text-white text-xl hover:bg-red-500 transition-all'>Login</motion.button>

                    <div className='w-full sm:w-[380px] flex gap-4 mt-3'>
                        <p className='border-b-2 border-gray-400 rounded- w-full'></p>


                        <p className='border-b-2 border-gray-400 rounded- w-full'></p>

                    </div>

                    {/* link section */}

                    <p className='flex gap-2 text-lg'>Don't have an account?:
                        <Link to='/register' className='sm:font-semibold font-bold'>

                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className='text-red-700 underline cursor-pointer bg-transparent' >Register</motion.button>

                        </Link>
                    </p>




                </form>





            </aside>

        </section>
    );
}

export default Login;
