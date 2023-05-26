import React, { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../store/product/productAction';
import { APIURL } from '../../APIURL';
import { MainLoader } from '../../UI';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { clearFields } from '../../store/product/productSlice';


const Items = () => {
    const dispatch = useDispatch()
    const { items, success, loading } = useSelector(state => state.product)
    // console.log(items[0]);





    useEffect(() => {
        dispatch(getAllItems())

    }, [dispatch])

    useEffect(() => {

        setTimeout(() => {
            dispatch(clearFields())

        }, 1000);

    }, [success, dispatch])


    return (
        <section className='py-10'>
            {loading && <MainLoader />}

            <table className="w-full h-full">
                <thead className="">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit/Delete</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    </tr>
                </thead>
                <tbody className=" overflow-y-scroll">
                    {items?.map(item => (
                        <tr key={item.id} className='border-2'>

                            <td className="px-6 py-4 whitespace-nowrap flex gap-3 h-20">
                                <AiFillDelete className='text-2xl' />
                                <AiFillEdit className='text-2xl' />

                            </td>
                            <td className="w-14 h-14"><LazyLoadImage src={`${APIURL}/file/${item.image}`} alt='loading' className="h-full w-full rounded-full " delayTime={900} effect='opacity' /></td>

                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>

                        </tr>
                    ))}
                </tbody>
            </table>








        </section>
    )
}

export default Items


