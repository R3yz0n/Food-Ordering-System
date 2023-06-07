import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllItems } from '../../../store/product/productAction';
import { APIURL } from '../../../utils/constants';
// import MainLoader from '../../../animations/MainLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { clearFields } from '../../../store/product/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../../animations';
// import { DeleteItem } from './DeleteItem';

const Item = ({ item, handleDelete, index, handleEdit }) => {


    return (

        <motion.tr  {...straggerFadeInOut(index)} className='shadow-md border-2 font-semibold text-textColor   '>
            <td className="py-[10px] px-6 ">
                <LazyLoadImage effect='opacity' src={`${APIURL}/file/${item.image}`} alt="Item" className="w-[70px] object-cover h-[70px] rounded-full" loading='lazy' />
            </td>
            <td className="py-4 px-6">{item.id}</td>
            <td className="py-4 px-6"><HiCurrencyRupee className='inline text-2xl -mt-1 font-bold text-red-600' /> {item.price}</td>
            <td className="py-4 px-6">{item.category}</td>
            <td className="py-4 px-6">
                <div className="flex  space-x-2 gap-3">
                    <FaEdit className="cursor-pointer text-green-600 hover:text-green-800 text-2xl" onClick={() => { handleEdit(item) }} />
                    <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 text-xl mt-1" onClick={() => { handleDelete(item) }} />
                </div>
            </td>
        </motion.tr>
    )
}

export default Item