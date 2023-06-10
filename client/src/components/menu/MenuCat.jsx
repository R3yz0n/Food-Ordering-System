import React, { useState } from 'react';
import { motion, stagger } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { straggerFadeInOut } from '../../animations/index';
import { foodCat } from '../../utils/constants';
import './Swiper.css'
import 'swiper/css/bundle'

const MenuCat = () => {


    const [category, setCategory] = useState('');

    const handleFilterClick = (category) => {
        setCategory(category);
        console.log(category);
    }

    return (
        <div className='w-full '>
            <motion.div className='w-1/2'>

                <Swiper
                    centeredSlides={false}
                    // grabCursor={true}
                    slidesPerView={3}
                    spaceBetween={30}

                    className="mySwiper"
                >
                    {/* {foodCat.map((item, index) => (
                        <SwiperSlide>
                            <FilterCard key={index} item={item} index={index} category={category} setCategory={handleFilterClick} />
                        </SwiperSlide>
                    ))} */}

                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>

                </Swiper>

                <div className='w-full pt-6 flex items-center justify-center gap-6 py-8 '>

                </div>
            </motion.div>
        </div>
    )
}

export default MenuCat












{/* <div className='w-1/2 mx-auto flex gap-10'>

<p className='text-2xl  text-headingColor font-bold rounded-md px-1 '> Our Menu Category  </p>

<input type="search" className='w-50 b rounded-md px-5' placeholder='Search Meal here ..' />
</div> */}

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