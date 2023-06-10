import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Menu from './menu/Menu'
import Profile from './profile/Profile'


const Main = () => {

    return (
        <main className='w-full min-h-screen  bg-primary '>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/profile' element={<Profile />} />



            </Routes>

        </main>
    )
}

export default Main