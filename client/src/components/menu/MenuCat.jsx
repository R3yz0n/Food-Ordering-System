import React, { useState } from 'react';
import LandingPageWrapper from '../../common/LandingPageWrapper';
import { motion, stagger } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { straggerFadeInOut } from '../../animations/index';
import { foodCat } from '../../utils/constants';

const MenuCat = () => {

    const [category, setCategory] = useState('');

    const handleFilterClick = (category) => {
        setCategory(category);
        console.log(category);
    }

    return (
        <div className='w-880 h-6 -mt-8'>
            <motion.div className='w-full'>
                <div className='w-full flex items-center justify-between'>
                    {/* <div className='flex flex-col items-start justify-start gap-1'>
                    
                </div> */}
                    {/* <p className='text-2xl  text-headingColor font-bold rounded-md px-1 '>
                        Our Menu Category
                    </p> */}
                </div>

                <div className='w-full pt-6 flex items-center justify-center gap-6 py-8 '>
                    {foodCat.map((item, index) => (<FilterCard key={index} item={item} index={index} category={category} setCategory={handleFilterClick} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default MenuCat

export const FilterCard = ({ item, index, category, setCategory }) => {
    const handleClick = () => {
        setCategory(item.category);
    };

    return (
        <motion.div key={index} {...straggerFadeInOut(index)} className={`hover:bg-red-500 hover:text-white shadow-md border-gray-200 border-2   group w-28 min-w-[128px] cursor-pointer rounded-3xl py-2 ${category === item.category ? 'bg-red-600' : 'bg-gray-100'} justify-center gap-4`} onClick={handleClick}>
            <div className={`w-16 mx-auto h-16 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${category === item.category ? 'bg-primary' : ' '}`} >
                <img src={item.image} className='object-contain w-full h-full' alt="" />
            </div>
            <p className={`text-center  text-textColor font-semibold group-hover:text-white ${category === item.category && 'text-white'}`} >{item.category.toUpperCase()}</p>

        </motion.div>
    );
};