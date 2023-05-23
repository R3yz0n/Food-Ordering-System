import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Main, Register } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fadeInOut } from './animations/index'
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('../src/components/Login'));

const App = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.user)


  useEffect(() => {
    const temp = localStorage.getItem('token')
    // dispatch(getUser(temp))


  }, [])

  return (

    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>

      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={
          <Suspense fallback={<h1>loading</h1>} >
            <LazyComponent />

          </Suspense>

        } />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/*' element={<Dashboard />} />

      </Routes>

    </main>
  )
}

export default App