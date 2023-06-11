import React, { useState } from 'react';
import { motion, stagger } from 'framer-motion';
import { straggerFadeInOut } from '../../animations/index';
import { BsSearch } from 'react-icons/bs'

import SwiperScroll from './SwiperScroll';


const MenuCat = () => {


    const [category, setCategory] = useState('');

    const handleFilterClick = (category) => {
        setCategory(category);
        console.log(category);
    }

    return (
        <div className='w-full '>
            <motion.div className='flex gap-8 w-[90%] px-10 mx-auto  items-center'>

                <div className='w-1/3 mx-auto flex gap-4 flex-col'>

                    <p className='text-[28px]  text-headingColor font-bold rounded-md px-1 '> Our Menu Category  </p>


                    <motion.div className={`flex items-center justify-center gap-4 bg-gray-100 border-2 border-gray-300 focus:border-red-600 rounded-md w-72 px-4 py-[6px] shadow-md `} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                        <input type='text' placeholder="Search item here"

                            className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none '

                        />
                        <BsSearch className='text-xl font-semibold text-red-500' />
                    </motion.div>




                </div>


                <div className='w-2/3 '>


                    <SwiperScroll category={category} handleFilterClick={handleFilterClick} />

                </div>
            </motion.div>
        </div>
    )
}

export default MenuCat














