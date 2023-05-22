import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Main, Register } from './components'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    const temp = localStorage.getItem('token')
    // dispatch(getUser(temp))


  }, [])

  return (

    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>

    </main>
  )
}

export default App