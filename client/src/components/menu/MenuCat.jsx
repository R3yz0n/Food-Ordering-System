import React, { useState } from 'react';
import { motion, stagger } from 'framer-motion';
import { btnClick, fadeInOut } from '../../animations/index';
import { BsSearch } from 'react-icons/bs'

import SwiperScroll from './SwiperScroll';


const MenuCat = () => {


    const [category, setCategory] = useState('all');

    const handleFilterClick = (category) => {
        setCategory(category);
        console.log(category);
    }

    return (
        <div className='max-w-[1300px]  mx-auto  '>

            <motion.div className='flex flex-col w-full  lg:flex-row gap-2 lg:gap-8 lg:w-full xl:w-[100%] px-3 sm:px-10 mx-auto  items-center ' {...fadeInOut}>

                <div className='w-4/5 sm:w-[70%] lg:w-1/3 mx-auto flex gap-3  flex-col  lg:pl-8 pt-2 lg:pt-5 '>

                    <p className='text-[26px]  text-headingColor font-bold rounded-md px-1 mx-auto lg:mx-0'> Our Menu Category </p>


                    <div className="mb-3">

                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <input type="search" className="relative focus:shadow-md shadow-black m-0 -mr-0.5 block w-[1px]  min-w-0 flex-auto rounded-l border-2 border-solid border-gray-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-lg text-black font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:border-red-600  focus:text-neutral-700  focus:outline-none" placeholder="Search food here" />

                            <motion.button {...btnClick} className="relative z-[2] flex items-center rounded-r bg-gray-900 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md  hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg" type="button" >
                                <BsSearch className='text-xl' />

                            </motion.button>
                        </div>
                    </div>

                </div>




                <div className='w-full  lg:w-2/3 lg:pl-[3%]   '>
                    <SwiperScroll category={category} handleFilterClick={handleFilterClick} />
                </div>


            </motion.div>

        </div>


    )
}

export default MenuCat














