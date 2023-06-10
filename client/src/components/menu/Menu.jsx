import React, { useState } from 'react';
import LandingPageWrapper from '../../common/LandingPageWrapper';
import { motion, stagger } from 'framer-motion';
import { straggerFadeInOut } from '../../animations/index';
import { foodCat } from '../../utils/constants';
import MenuCat from './MenuCat';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Swiper.css'
import 'swiper/css/bundle'


const Menu = () => {


    return (
        <main className=' pt-24 h-full '>
            <MenuCat />

        </main>
    );
};

export default Menu;


