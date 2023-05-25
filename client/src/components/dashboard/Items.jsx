import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'

const Items = () => {


    const data = [
        { id: 1, name: 'Item 1', category: 'Category 1', price: 10.99, image: 'image1.jpg' },
        { id: 2, name: 'Item 2', category: 'Category 2', price: 19.99, image: 'image2.jpg' },
        { id: 3, name: 'Item 3', category: 'Category 1', price: 14.99, image: 'image3.jpg' },
        { id: 4, name: 'Item 4', category: 'Category 3', price: 9.99, image: 'image4.jpg' },
        { id: 5, name: 'Item 5', category: 'Category 2', price: 12.99, image: 'image5.jpg' },
        { id: 1, name: 'Item 1', category: 'Category 1', price: 10.99, image: 'image1.jpg' },
        { id: 1, name: 'Item 1', category: 'Category 1', price: 10.99, image: 'image1.jpg' },
        { id: 2, name: 'Item 2', category: 'Category 2', price: 19.99, image: 'image2.jpg' },
        { id: 3, name: 'Item 3', category: 'Category 1', price: 14.99, image: 'image3.jpg' },
        { id: 4, name: 'Item 4', category: 'Category 3', price: 9.99, image: 'image4.jpg' },
        { id: 5, name: 'Item 5', category: 'Category 2', price: 12.99, image: 'image5.jpg' },
        { id: 1, name: 'Item 1', category: 'Category 1', price: 10.99, image: 'image1.jpg' },


    ];

    return (
        <section className='py-10'>

            <table className="w-full h-full">
                <thead className="bg-white">e
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit/Delete</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    </tr>
                </thead>
                <tbody className="bg-purple-50 overflow-y-scroll">
                    {data.map(item => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                                <AiFillDelete className='text-2xl' />
                                <AiFillEdit className='text-2xl' />

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap"><img src={item.image} alt={item.name} className="h-8 w-8" /></td>

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