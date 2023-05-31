import React from 'react'
import Navbar from '../components/Navbar'
import Home from './Home'
const Main = () => {
    return (
        <main className='w-full min-h-screen flex items-center justify-start flex-col bg-primary b'>
            <Navbar />

            <div className='w-ful flex flex-col items-start justify-center mt-32 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>

                <Home />
            </div>

        </main>
    )
}

export default Main