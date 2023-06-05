import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/components/Dashboard'
import Main from './components/Main'
import AdminRoute from './helpers/AdminRoute'
import ProgressBar from './utils/ProgressBar'
import Login from './components/login/signup/Login'
import Register from './components/login/signup/Register'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './store/user/currUserAction'



const App = () => {
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.auth)
  console.log(userId);

  useEffect(() => {
    console.log('fetching user data...');
    if (token)
      dispatch(getUser())

  }, [])



  return (

    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center '>
      <ProgressBar />

      <Routes>
        <Route path='/*' element={<Main />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard/*' element={<AdminRoute>
          <Dashboard />
        </AdminRoute>} />

      </Routes>

      <Toaster position="top-right"

        toastOptions={{
          style: {
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            maxWidth: '300px',
            position: 'relative',
            top: '185px'

          },
        }}
        reverseOrder={false} />

    </main>
  )
}

export default App