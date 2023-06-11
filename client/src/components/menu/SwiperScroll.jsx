import React from 'react'
import './Swiper.css'
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FoodCat } from '../../utils/constants';
import { motion, stagger } from 'framer-motion';
import { straggerFadeInOut } from '../../animations/index';

const SwiperScroll = ({ category, handleFilterClick }) => {

    return (
        <Swiper centeredSlides={false} grabCursor={true} slidesPerView={4} spaceBetween={30} className="mySwiper "  >
            {FoodCat.map((item, index) => (
                <SwiperSlide>
                    <FilterCard key={index} item={item} index={index} category={category} setCategory={handleFilterClick} />
                </SwiperSlide>
            ))}



        </Swiper>
    )
}

export default SwiperScroll




export const FilterCard = ({ item, index, category, setCategory }) => {
    const handleClick = () => {
        setCategory(item.category);
    };

    return (
        <motion.div key={index} {...straggerFadeInOut(index)} className={`hover:bg-red-500 hover:text-white shadow-md border-gray-200 border-2   group w-28 min-w-[100px] cursor-pointer rounded-3xl py-2 ${category === item.category ? 'bg-red-600' : 'bg-gray-100'} justify-center gap-4`} onClick={handleClick}>
            <div className={`w-12 flex-col mx-auto h-12 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${category === item.category ? 'bg-primary' : ' '}`} >
                <img src={item.image} className='object-contain w-full h-full' alt="" />
            </div>
            <p className={`text-center  text-textColor font-semibold group-hover:text-white ${category === item.category && 'text-white'}`} >{item.category.toUpperCase()}</p>

        </motion.div>
    );
};