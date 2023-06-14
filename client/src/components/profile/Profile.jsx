import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { userData } = useSelector(state => state.currUser)

    return (
        <div className='pt-52  w-full h-screen'>


            <section className="">
                <div className="container py-5 h-100">
                    <div className="flex justify-center items-center h-100">
                        <div className="lg:w-1/2 mb-4 mb-lg-0">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-gradient-to-b from-indigo-500 to-purple-500 text-center text-white rounded-tl-lg rounded-bl-lg py-5">
                                        {
                                            userData?.image ? <img
                                                src={userData?.image}
                                                alt="Avatar"
                                                className="my-5 w-28 mx-auto h-28 rounded-full object-cover"
                                            /> : <p className='w-20 h-20 mx-auto rounded-full bg-orange-500'></p>
                                        }
                                        <h5 className="text-lg">{userData?.userName}</h5>
                                        <p className="text-sm"> Dark Web Developer</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="md:w-2/3 py-4 px-4">
                                        <div>
                                            <h6 className="font-bold">Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="flex mb-3">
                                                <div className="w-1/2">
                                                    <h6 className="font-bold">Email</h6>
                                                    <p className="text-gray-600">{userData?.email}</p>
                                                </div>
                                                <div className="w-1/2">
                                                    <h6 className="font-bold">Phone</h6>
                                                    <p className="text-gray-600">{userData?.phoneNumber ? userData.phoneNumber : '123 456 789'}</p>
                                                </div>
                                            </div>

                                            <h6 className="font-bold">Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="flex mb-3">
                                                <div className="w-1/2">
                                                    <h6 className="font-bold">Email</h6>
                                                    <p className="text-gray-600">{userData?.email}</p>
                                                </div>
                                                <div className="w-1/2">
                                                    <h6 className="font-bold">Address</h6>
                                                    <p className="text-gray-600">{userData?.address ? userData.address : '123 456 789'}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-start">
                                                <a href="#!" className="me-3"><i className="fab fa-facebook text-lg"></i></a>
                                                <a href="#!" className="me-3"><i className="fab fa-twitter text-lg"></i></a>
                                                <a href="#!" className="me-3"><i className="fab fa-instagram text-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >



        </div >
    )
}

export default Profile