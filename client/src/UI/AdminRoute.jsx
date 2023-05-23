import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainLoader from './MainLoader'

const ProtectedRoute = ({ children }) => {

    const { userData } = useSelector(state => state.auth)
    const navigate = useNavigate('/')


    useEffect(() => {

        if (userData?.role !== 'admin') {
            setTimeout(() => {
                navigate('/')
            }, 1000);

        }

    }, [userData?.role, navigate])



    if (userData?.role !== 'admin')
        return (

            <div className='w-screen h-screen bg-gradient-to-b from-gray-400  to-gray-500 '>
                <MainLoader />
            </div>

        )

    return (

        <>
            {children}

        </>

    )
}

export default ProtectedRoute