import { motion } from 'framer-motion'
import React from 'react'
import { HiCurrencyRupee } from 'react-icons/hi';
import { AiFillMinusCircle } from 'react-icons/ai'
import { AiFillPlusCircle } from 'react-icons/ai'
import { btnClick } from '../../animations';

const CartItem = ({ item }) => {
  console.log(item);
  return (
    <motion.section className='w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-2 sm:pl-2 xs:pr-3 sm:pr-4 gap-4'>

      <div className='h-20  w-20 sm:w-28 sm:h-24 py-2 flex'>
        <img src={item.image} className='w-full h-full object-contain m-auto' alt="Cart Item" />
      </div>

      <div className='flex items-center justify-start gap-1 w-full h-20 '>
        <p className='text-[15px] xs:text-base md:text-lg text-primary font-semibold h-auto   w-28 xs:w-40 '>
          <span className='line-clamp-2 font-sans'>
            {item.name}
          </span>
          <span className='text-[13px] xs:text-sm block capitalize text-gray-400 '>
            {item.category}
          </span>

        </p>

        <p className='text-sm font-semibold text-red-400 ml-auto flex items-center justify-center gap-1'>
          <HiCurrencyRupee className='text-red-500 text-lg' />
          1200
        </p>

        {/* buttons */}
        <div className='ml-auto flex items-center justify-center gap-3'>
          <motion.div className='h-7 w-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-950 cursor-pointer active:bg-green-600' {...btnClick}>
            <p className='text-xl sm:text-xl font-semibold text-primary '>+</p>
          </motion.div>
          <p className='text-base sm:text-lg text-primary font-semibold'>{2}</p>
          <motion.div className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-950 cursor-pointer active:bg-blue-600' {...btnClick}>
            <p className='text-xl sm:text-xl font-semibold text-primary'>--</p>
          </motion.div>

        </div>



      </div>

    </motion.section>

  )
}

export default CartItem