import React from 'react'
import DBHeader from './DBHeader'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/dashboard/Home'
import Orders from '../components/dashboard/Orders'
import AddNewItem from '../components/dashboard/addnewitem/AddNewItem'
import Users from '../components/dashboard/Users'
import Items from '../components/dashboard/items/Items'

const DBRight = () => {
    return (

        <section className=' py-5 px-8 flex-1 bg-[rgb(235,235,235)] overflow-y-auto  max-h-screen'>
            <DBHeader />

            <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>

                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/addnewitems' element={<AddNewItem />} />
                    <Route path='/items' element={<Items />} />
                    <Route path='/users' element={<Users />} />


                </Routes>

            </div>

        </section>
    )
}

export default DBRight