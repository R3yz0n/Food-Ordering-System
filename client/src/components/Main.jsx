import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Menu from './menu/Menu'


const Main = () => {
    return (
        <main className='w-full min-h-screen flex items-center justify-start flex-col bg-primary '>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/menu' element={<Menu />} />



            </Routes>







        </main>
    )
}

export default Main