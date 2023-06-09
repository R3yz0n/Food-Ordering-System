import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import FoodZone from '../assests/FoodZone.png'
import { isActiveStyles, isNotActiveStyles } from '../utils/nav'
import { motion } from 'framer-motion'
import { btnClick, slideTop } from '../animations'
import { MdLogout, MdShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../assests/Avatar.png'
import { logout } from '../store/user/authSlice'
import { clearUserData } from '../store/user/currUserSlice'

const Header = () => {

    const [isMenu, setIsMenu] = useState(false)
    const { userData } = useSelector(state => state.currUser)
    // console.log(userData);
    const dispatch = useDispatch()

    const handleLogout = async () => {

        dispatch(logout())

        dispatch(clearUserData())



    }



    return (

        <header className='fixed backdrop-blur-sm bg-gray-100 bg-opacity-80 z-40 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20  pt-2 w-full border-[1px] border-b-gray-300'>

            <NavLink to='/' className='flex items justify-center gap-4 '>
                <img src={FoodZone} className='w-[70px]' alt="FoodZone" />
                <p className='font-semibold text-xl'>Foodie.</p>
            </NavLink>


            <nav className='flex items-center justify-center gap-8'>

                <ul className='hidden md:flex items-center justify-center gap-16 '>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/'}>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/menu'}>Menu</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/services'}>Services</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/aboutus'}>About Us</NavLink>
                </ul>


                <motion.div {...btnClick} className='relative cursor-pointer' >

                    <MdShoppingCart className='text-3xl text-textColor' />
                    <div className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1'>
                        <p className='text-primary text-base font-semibold'>2</p>
                    </div>

                </motion.div>

                {
                    userData?.userName ?
                        <div className='relative cursor-pointer' onMouseEnter={() => setIsMenu(true)} onMouseLeave={() => setIsMenu(false)} >
                            <div className='w-14 h-14 rounded-full shadow-md cursor-pointer overflow-hidden bg-green-200 flex items-center justify-center border-[1px] border-orange-700'>

                                <motion.img className='w-full h-full object-cover' src={userData?.image ? userData.image : Avatar}
                                    whileHover={{ scale: 1.1 }} referrerPolicy='no-referrers' />

                            </div>

                            {
                                isMenu && <motion.div className='px-6 py-4 bg-gray-200 backdrop-blur-md rounded-md absolute top-13 right-0 flex flex-col gap-4 w-48' {...slideTop}>

                                    {
                                        userData.role === 'admin' &&

                                        <Link className='hover:text-red-500 text-xl text-textColor ' to='/dashboard'>
                                            Dashboard
                                        </Link>

                                    }

                                    <Link className='hover:text-red-500 text-xl text-textColor ' to='/profile' >
                                        My profile
                                    </Link>

                                    <Link className='hover:text-red-500 text-xl text-textColor ' to='/user-orders' >
                                        Orders
                                    </Link>
                                    <hr className='border-green-500' />

                                    <motion.div {...btnClick} className='group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3' onClick={handleLogout} >

                                        <MdLogout className='text-2xl text-textColor group-hover::text-headingColor' />

                                        <p className='text-textColor text-xl group-hover:text-headingColor'>Logout</p>


                                    </motion.div>

                                </motion.div>
                            }
                        </div>
                        :

                        <NavLink to='/login'>
                            <motion.button {...btnClick} className='px-5 py-2 rounded-md shadow-md bg-gray-200 underline border-red-300 cursor-pointer' >Login</motion.button>

                        </NavLink>
                }


            </nav>

        </header >


    )
}

export default Header