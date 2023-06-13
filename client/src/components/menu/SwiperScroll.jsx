import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { MenuCategory } from '../../utils/constants';
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../animations/index';

const SwiperScroll = ({ category, handleFilterClick }) => {
    const [slidesPerView, setSlidesPerView] = useState(4);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1240) {
                setSlidesPerView(5);
            } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
                setSlidesPerView(5);
            }
            else if (window.innerWidth > 500)
                setSlidesPerView(4)
            else {
                setSlidesPerView(3)
            }
        };


        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial slidesPerView based on the current width

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Swiper centeredSlides={false} grabCursor={true} slidesPerView={slidesPerView} spaceBetween={30} className="mySwiper  "  >

            {MenuCategory.map((item, index) => (

                <React.Fragment key={item.id}>
                    <SwiperSlide key={item.id}>
                        <CategoryCard key={index} item={item} index={index} category={category} setCategory={handleFilterClick} />
                    </SwiperSlide>
                </React.Fragment>
            ))}



        </Swiper>
    )
}

export default SwiperScroll




export const CategoryCard = ({ item, index, category, setCategory }) => {
    const handleClick = () => {
        setCategory(item.category);
    };

    return (
        <motion.div key={index} {...straggerFadeInOut(index)} className={`hover:bg-red-500 hover:text-white   border-gray-200 border-2    group sm:w-28 min-w-[60px] cursor-grab rounded-xl pt-2 pb-1 ${category === item.category ? 'bg-red-600 border-transparent ' : 'bg-gray-100'} justify-center gap-4  `} onClick={handleClick}>
            <div className={`w-14 flex-col mx-auto h-14 rounded-full shadow-md flex items-center justify-center  group-hover:bg-primary ${category === item.category ? 'bg-primary border-none' : ''}`} >
                <img src={item.image} className='object-contain w-full h-full ' alt="Food Item" />
            </div>
            <p className={`text-center text-[14px] pt-2  text-textColor  font-semibold group-hover:text-white ${category === item.category && 'text-white'} `} >{item.category.toUpperCase()}</p>

        </motion.div>
    );
};