import React from 'react'
import { fadeInOut } from '../animations'
import { motion } from 'framer-motion'
import { RotatingLines } from 'react-loader-spinner'

const MainLoader = () => {
    return (
        <motion.div className='opacity-50 fixed z-50 inset-0 backdrop-blur-sm flex items-center justify-center w-full backdrop-filter' {...fadeInOut}>
            <div className='flex items-center justify-center container'>

                <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="1.1"
                    width="100"
                    visible={true}
                />


            </div>
        </motion.div>
    )
}

export default MainLoader