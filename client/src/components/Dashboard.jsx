import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { userData } = useSelector(state => state.user)


    const navigate = useNavigate()
    console.log(userData);



    useEffect(() => {

        if (userData?.role !== 'admin')
            navigate('/')



    }, [userData?.role])

    if (userData?.role !== 'admin')
        return <></>

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard


// const ProtectedRoute = ({ element: Component, ...rest }) => {

//     if (!userToken) {
//         return <Route {...rest} element={<Component />} />
//     } else {
//         return <Navigate to="/login" replace />
//     }
// }
