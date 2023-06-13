import React, { useEffect, useState } from 'react';
import MenuCat from './MenuCat';
import { useDispatch, useSelector } from 'react-redux';
import FoodItemCard from './FoodItemCard';
import './Swiper.css'
import 'swiper/css/bundle'
import { getAllItems } from '../../store/product/productAction';


const Menu = () => {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAllItems())

    }, [dispatch])


    return (
        <main className=' pt-[90px] h-full pb-20'>

            <MenuCat />

            <div className='mt-10 max-w-screen-lg xl:max-w-screen-xl gap-x-0  mx-auto   grid  xs:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-y-5   lg:p-0 '>
                {
                    items.map((item,) => <FoodItemCard key={item.id} item={item} />)

                }
            </div>

        </main>
    );
};

export default Menu;



