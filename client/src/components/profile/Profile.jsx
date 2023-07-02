import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { userData } = useSelector(state => state.currUser)

    return (
        <main className='pt-24  w-full h-screen  flex items-center justify-center'>

            <div className='h-[95%] w-4/5 '>

                <aside className=' w-2/3 h-full'>


                    <div className='flex gap-10'>
                        <aside className='flex flex-col h-fit'>
                            <label htmlFor="">Username</label>
                            <input className='bg-transparent outline-gray-500 border-gray-500 border-2 rounded' type="text" />
                        </aside>
                        <aside className='flex flex-col h-fit'>
                            <label htmlFor="">Email</label>
                            <input className='bg-transparent outline-gray-500 border-gray-500 border-2 rounded' type="text" />
                        </aside>

                    </div>

                    <div>

                        <aside className='flex flex-col h-fit'>
                            <label htmlFor="">Phone Number</label>
                            <input className='bg-transparent outline-gray-500 border-gray-500 border-2 rounded' type="text" />
                        </aside>

                    </div>

                    <div>

                        <aside className='flex flex-col h-fit'>
                            <label htmlFor="">Address</label>
                            <input className='bg-transparent outline-gray-500 border-gray-500 border-2 rounded' type="text" />
                        </aside>

                    </div>


                </aside>










            </div>






        </main >
    )
}

export default Profile