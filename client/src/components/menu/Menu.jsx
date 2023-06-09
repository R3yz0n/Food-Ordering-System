import React, { useState } from 'react';
import LandingPageWrapper from '../../common/LandingPageWrapper';
import { motion, stagger } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { straggerFadeInOut } from '../../animations/index';
import { foodCat } from '../../utils/constants';
import MenuCat from './MenuCat';


const Menu = () => {


    return (
        <>
            <LandingPageWrapper>
                <MenuCat />
            </LandingPageWrapper>

            {/* <div className='b w-[1280px] h-3'>


            </div> */}
        </>
    );
};

export default Menu;


