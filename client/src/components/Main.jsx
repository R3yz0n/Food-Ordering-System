import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Menu from './menu/Menu'
import Profile from './profile/Profile'
import Contact from './contact/Contact'
import PageNotFound from './PageNotFound'
import Cart from './cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotalQuantity, clearFields } from '../store/cart/cartSlice'
import { getAllCartItems } from '../store/cart/cartAction'


const Main = () => {
    const { isCartOn, cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.currUser)

    useEffect(() => {
        if (userData?.role && localStorage.getItem('userToken')) {

            dispatch(getAllCartItems(userData?.id)).then(() => {
                dispatch((clearFields()))

            })

        }

    }, [userData?.id, userData?.role, dispatch]);

    useEffect(() => {

        dispatch(calculateTotalQuantity())
    }, [cartItems, dispatch])

    return (
        <main className='w-full min-h-screen  bg-primary'>
            <Navbar />

            {isCartOn && <Cart />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<PageNotFound />} />




            </Routes>

        </main>
    )
}

export default Main