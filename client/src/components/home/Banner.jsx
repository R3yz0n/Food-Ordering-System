import React from 'react'
import BannerBg from '../../assests/BannerBg.jpg'
import BannerRight from '../../assests/BannerRight.png'
import { motion } from 'framer-motion'
import { btnClick } from '../../animations'

const Banner = () => {

    return (

        <section className="relative w-full bg-black h-[70vh] text-white flex overflow-hidden" id='banner'>


            <aside className='flex mx-auto w-[80%]  z-40 h-full '>

                <div className='flex flex-col h-full py-8 justify-center w-3/5 gap-5'>

                    <p className='text-[44px] font-bold'>Enjoy Our Delicious Meal</p>
                    <p className='font-semibold opacity-90 text-lg lg:pr-8'>A restaurant is a place where people go to enjoy a meal, typically with friends, family, or colleagues.</p>

                    <motion.button {...btnClick} className='bg-orange-500 hover:bg-orange-600 px-4 py-2 w-52 rounded-md tracking-wider text-headingColor text-xl font-bold'>See Our Menu</motion.button>

                </div>

                <img src={BannerRight} alt="Banner Right" className="w-96 h-96 z-40  flex my-auto mx-auto opacity-90 object-cover p-3 " />
            </aside>





            <img src={BannerBg} className="h-full w-full absolute top-0 right-0 z-0 backdrop-filter  opacity-40 backdrop-blur-md blur-[1px] " alt="Banner Bg" />
        </section>
    )
}

export default Banner