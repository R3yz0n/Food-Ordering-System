import React from 'react'
import { FooterItems } from '../../utils/constants'

const Footer = () => {
    return (

        <section className='w-full lg:h-370 bg-[rgb(18,22,24)] '>


            <div className='text-white my-auto flex flex-col h-full py-10 gap-16'>

                <p className='text-4xl flex gap-3 font-semibold  mx-auto pt-6'>
                    <span>GET FOOD</span>
                    <span className='bg-orange-500 text-black px-3 rounded-sm -mt-1 py-1 tracking-wide'>DELIVERED</span>
                </p>

                <aside className='grid grid-cols-2 lg:flex w-full lg:w-4/5 mx-auto  '>
                    {
                        FooterItems.map(item =>
                            <div className='flex-1'>
                                <img src={item.image} className='object-cover w-24 mx-auto' alt='foodie'></img>
                                <p className='text-center text-xl py-6 px-2'>{item.title}</p>
                            </div>)
                    }

                </aside>


            </div>


        </section>

    )
}

export default Footer