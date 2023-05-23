import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { addItemSchema } from '../../schema/index'



const initialValues = { name: '', category: '', price: '', file: null };
// I did a very challanging thing here i mapped a p tag and used it with formik thank to stackoverflow

const AddNewItem = () => {

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: addItemSchema,
        onSubmit: async (values, action) => {

        }

    });

    useEffect(() => {

        console.log(values);
        console.log(errors);
    }, [values, errors])


    return (

        <form className='flex items-center justify-center flex-col pt-6 px-24 w-full' onSubmit={handleSubmit} >

            <aside className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center  justify-center gap-4'>

                {/* name and price  */}
                <div className='w-full flex gap-4'>
                    <input type="text" placeholder='Enter Item name' className='w-2/3 px-4 py-3 bg-gray-100  shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400' onBlur={handleBlur} onChange={handleChange} name='name' value={values.name} />
                    <input type="number" placeholder='Enter Item Price' className='w-1/3 px-4 py-3 bg-gray-100  shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400' onBlur={handleBlur} onChange={handleChange} name='price' value={values.price} />
                </div>

                {/* category */}

                <div className='w-full flex items-center justify-around gap-3 flex-wrap' >
                    {
                        foodCat.map((item) =>
                            <p key={item.id} name={item.category} value={values.name} className={`${item.category === values.category ? 'bg-red-400 text-white' : 'bg-transparent'} px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gra-300 backdrop-blur-md`} onClick={() => {
                                console.log(values.category);

                                handleChange('category')(item.category)
                            }}
                                onBlur={handleBlur('category')}
                            >
                                {item.title}
                            </p>
                        )
                    }
                </div>


                <div className='w-2/3 bg-card backdrop-blur-md  h-[300px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>

                </div>



            </aside>


            <button type='submit'>click here</button>





        </form>
    )
}
// 'drinks pizzzas seafood vegan burgers, pasta chinise'

export default AddNewItem


export const foodCat = [
    { id: 1, title: "Drinks", category: "drinks" },
    { id: 2, title: "Pizzas", category: "pizzas" },
    { id: 3, title: "Seafood", category: "seafood" },
    { id: 4, title: "Vegan", category: "vegan" },
    { id: 5, title: "Burgers", category: "burgers" },
    { id: 6, title: "Pasta", category: "pasta" },
    // { id: 7, title: "Chinese", category: "chinese" }

]
