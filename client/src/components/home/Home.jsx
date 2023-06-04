import React from 'react'
import Hero from './Hero'
import Banner from './Banner'
import Footer from './Footer'
import Triangle from '../../assests/Triangle.png'

const Home = () => {
    return (
        <>

            <Hero />
            <img src={Triangle} className=' h-[13px] w-full object-cover' alt="Triangle" />
            <Banner />
            <Footer />

        </>
    )
}

export default Home