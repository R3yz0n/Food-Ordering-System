import React from 'react'
import Navbar from '../components/Navbar'
import Home from './Home'
import MainBg from '../assests/MainBg.jpg'
import SideBg from '../assests/SideBg.png'
const Main = () => {
    return (
        <main className='w-full min-h-screen flex items-center justify-start flex-col bg-primary b'>
            <Navbar />

            <div className='w-ful flex flex-col items-start justify-center mt-32 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>

                <Home />
            </div>

            <div className='relative w-full'>

                <img src={SideBg} alt="" className='w-52 z-50 b backdrop-blur-md ' />
                <img src={MainBg} className='h-[60vh] w-full absolute top-0 right-0 z-10 backdrop-blur-sm ' alt="" />

                <p>hello</p>
            </div>

        </main>
    )
}

export default Main