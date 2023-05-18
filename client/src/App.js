import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Main } from './components'

const App = () => {

  return (
    <main className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />

      </Routes>

    </main>
  )
}

export default App