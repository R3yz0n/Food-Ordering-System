import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/components/Dashboard'
import Login from './components/Landing/Login'
import Register from './components/Landing/Register'
import Main from './components/Main'
import AdminRoute from './helpers/AdminRoute'
import Aboutus from './components/Landing/Aboutus'
import ProgressBar from './utils/ProgressBar'


const App = () => {




  return (

    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center '>
      <ProgressBar />

      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/menu' element={<div>
          hello div
        </div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/login' element={<Aboutus />} />

        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/*' element={<AdminRoute>
          <Dashboard />
        </AdminRoute>} />

      </Routes>

    </main>
  )
}

export default App