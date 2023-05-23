import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Main, Register } from './components'
import { AdminRoute } from './UI'


const App = () => {




  return (

    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>

      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/*' element={<AdminRoute>
          <Dashboard />
        </AdminRoute>} />

      </Routes>

    </main>
  )
}

export default App