import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../../store/product/productAction';
import { APIURL } from '../../../utils/constants';
import MainLoader from '../../../animations/MainLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { clearFields } from '../../../store/product/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion';
import { fadeInOut, pop, slideTop } from '../../../animations';
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom';
import { DeleteItem } from './DeleteItem';



const Items = () => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation()
    console.log(location);
    const dispatch = useDispatch()
    const { items, success, loading, error } = useSelector(state => state.product)
    // console.log(items[0]);



    useEffect(() => {
        dispatch(getAllItems())

    }, [dispatch, location.pathname])

    useEffect(() => {

        setTimeout(() => {
            if (success === true)
                dispatch(clearFields())


        }, 1000);

    }, [success, dispatch])




    return (
        <div className="   mt-10 max-h-[80vh] overflow-y-auto scrollbar-thin shadow-lg relative">
            {error && toast.error(error)}
            {loading && <MainLoader />}


            <table className="min-w-full ">
                <thead className="  text-lg text-gray-800 bg-[rgb(229,231,235)] shadow-md font-sans ">
                    <tr>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Category</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-scroll max-h-[60vh] scrollbar-track-black">
                    {items.map((item) => (
                        <motion.tr  {...pop} key={item.id} className='shadow-md border-2 font-semibold text-textColor   '>
                            <td className="py-[10px] px-6 ">
                                <img src={`${APIURL}/file/${item.image}`} alt="Product" className="w-[70px] object-cover h-[70px] rounded-full" />
                            </td>
                            <td className="py-4 px-6">{item.name}</td>
                            <td className="py-4 px-6"><HiCurrencyRupee className='inline text-2xl -mt-1 font-bold text-red-600' /> {item.price}</td>
                            <td className="py-4 px-6">{item.category}</td>
                            <td className="py-4 px-6">
                                <div className="flex  space-x-2 gap-3">
                                    <FaEdit className="cursor-pointer text-green-600 hover:text-green-800 text-2xl" />
                                    <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 text-xl mt-1" onClick={() => setShowModal(true)} />
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
            {showModal && <DeleteItem setShowModal={setShowModal} />}
        </div>








    )
}

export default Items


