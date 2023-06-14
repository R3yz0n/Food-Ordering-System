import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems, searchItems } from '../../../store/product/productAction';
import MainLoader from '../../../animations/MainLoader';
import { clearFields } from '../../../store/product/productSlice';
// import Item from './Item';

const Users = () => {

    const dispatch = useDispatch()
    const { searchValue } = useSelector(state => state.search)







    useEffect(() => {
        // console.log(searchValue);
        if (searchValue) {
            const id = setTimeout(() => {


                const search = { searchValue: searchValue, category: 'all' }
                dispatch(searchItems(search)).then(res => dispatch(clearFields()))

            }, [2000])

            return () => { clearTimeout(id) }

        }
        else {

            dispatch(getAllItems()).then(() => { dispatch(clearFields()) })
        }


    }, [dispatch, searchValue])







    return (
        <>
            <div className="   mt-10 max-h-[80vh] overflow-y-auto scrollbar-thin shadow-lg relative">
                {/* {loading && <MainLoader />} */}


                <table className="min-w-full static" >
                    <thead className="  text-lg text-gray-800 bg-[rgb(229,231,235)] shadow-md font-sans ">
                        <tr>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 pl-3 pr-2 text-left">Phone Number</th>
                            <th className="py-3 px-6 text-left">Address</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll max-h-[60vh] scrollbar-track-black ">
                        {/* 
                        {items?.length > 0 ? items.map((item, index) => (

                            <Item item={item} handleDelete={handleDelete} handleEdit={handleEdit} index={index} key={item.id} />


                        )) : <tr className='text-red-700  flex w-full  p-2 text-lg'><td className=''>No Data Found.</td></tr>
                        } */}
                    </tbody>
                </table>
            </div>

        </>









    )
}

export default Users


