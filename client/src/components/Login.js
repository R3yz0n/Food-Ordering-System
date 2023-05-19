import { FormInput } from '../UI';
import FoodBg from '../assests/foodBg.jpg'
import Logo from '../assests/logo.png'
import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";





const Login = () => {

    return (
        <section className='w-screen h-screen relative overflow-hidden flex border-2'>

            {/* background Image */}
            <LazyLoadImage src={FoodBg} alt='Food Background Image' className='w-full h-full object-cover  absolute top-0 left-0 border-black' />

            <aside className='flex flex-col bg-slate-300 items-center w-[80%] backdrop-filter h-full z-10 md:w-508 backdrop-blur-xl p-4 px-4 py-12 bg-opacity-50 gap-6'>

                {/* //top section */}
                <div className='flex items-center justify-start gap-4 w-full'>

                    <img src={Logo} alt="" className='w-8' />
                    <p>City</p>



                </div>
                <p className="text-headingColor font-semibold text-3xl">Welcome Back</p>
                <p className='text-xl text-textColor -mt-6'>Sign in with following</p>

                {/* input section */}

                <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4 border-2'>

                    <FormInput />


                </div>





            </aside>

        </section>
    );
}

export default Login;
