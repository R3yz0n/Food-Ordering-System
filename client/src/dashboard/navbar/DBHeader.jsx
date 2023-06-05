import React from 'react'
import { MdLogout, MdSearch } from 'react-icons/md'
import { BsFillBellFill, BsToggles2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { btnClick } from '../../animations'
import Avatar from '../../assests/Avatar.png'

import { logout } from '../../store/user/authSlice'
import { clearUserData } from '../../store/user/currUserSlice'

const DBHeader = () => {
    const { userData } = useSelector(state => state.currUser)
    const dispatch = useDispatch()
    return (
        <section className='w-full flex items-center justify-between gap-3  px-3 '>

            {/* left */}
            <p className='text-2xl text-headingColor font-semibold  font-sans ' >Welcome to FoodZone
                {userData && <span className='block text-base text-black'>Hello {userData?.userName}.</span>}
            </p>

            {/* right */}

            <div className='flex items-center justify-center gap-4'>

                <div className='flex items-center justify-center gap-4'>

                    <div className='flex items-center justify-center gap-3 px-4 py-2 backdrop-blur-md rounded-md shadow-lg  bg-gray-100'>
                        <MdSearch className='text-gray-700 text-2xl ' />
                        <input type="text" placeholder='Search here..' className=' bg-transparent w-48 outline-none text-base' />
                        <BsToggles2 className='text-gray-700 text-2xl' />
                    </div>


                    <motion.div {...btnClick} className='w-10 bg-gray-100 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center h-10 gap-2 ' >
                        <BsFillBellFill className='text-gray-500 text-xl h-full' />
                    </motion.div>


                    <div className='flex items-center  justify-center gap-2'>

                        <div className='w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden'>
                            <motion.img className='w-full h-full object-cover rounded-md' src={userData?.image ? userData.image : Avatar}
                                whileHover={{ scale: 1.1 }} referrerPolicy='no-referrers' />
                        </div>

                        <motion.div {...btnClick} className='w-10 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center h-10  bg-gray-100' >
                            <MdLogout className='text-2xl text-textColor group-hover::text-headingColor h-10' onClick={() => { dispatch(logout()); dispatch(clearUserData()) }} />
                        </motion.div>


                    </div>

                </div>

            </div>


        </section>
    )
}

export default DBHeader