import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { addItemSchema } from '../../../schema/index'
import { motion } from 'framer-motion';
import { btnClick, fadeInOut, pop } from '../../../animations';
import DragDrop from '../../../utils/DragDrop'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../../../store/product/productAction';
import { clearFields } from '../../../store/product/productSlice';
import MainLoader from '../../../animations/MainLoader';
import { FaEdit, FaTrash } from 'react-icons/fa'




const initialValues = { name: 'Pizza', category: 'drinks', price: '1200', file: null };
// I did a very challanging thing here i mapped a p tag and used it with formik thank to stackoverflow
const AddNewItem = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    console.log(product);

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: addItemSchema,
        onSubmit: async (values, action) => {
            console.log(values);
            dispatch(createItem(values))


        }

    });


    useEffect(() => {
        // console.log(1);
        dispatch(clearFields())

    }, [values, dispatch])


    useEffect(() => {

        console.log(values);
        // console.log(errors);
    }, [values, errors])

    useEffect(() => {
        setTimeout(() => {
            console.log('hi');
            dispatch(clearFields())

            resetForm()

        }, 4000);

    }, [product.success, dispatch])

    return (

        <form className='flex items-center justify-center flex-col pt-6 max-w-screen-md mx-auto w-full px-4' onSubmit={handleSubmit} >

            <aside className='border border-purple-200 shadow-xl rounded-md p-4 w-full flex flex-col items-center  justify-center gap-4 py-6 pb-10'>

                {product.loading && <MainLoader />}

                {/* name and price  */}
                <div className='w-full flex gap-4'>

                    <aside className='w-2/3'>
                        <motion.input type="text" {...pop} placeholder='Enter Item name' className='w-full px-4 py-3 bg-gray-100 font-semibold   shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400' onBlur={handleBlur} onChange={handleChange} name='name' value={values.name} />
                        {touched.name && errors.name && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500'>{errors.name}</motion.div>}
                    </aside>

                    <aside className='w-1/3'>
                        <motion.input {...pop} type="number" placeholder='Enter Item Price' className='w-full px-4 py-3 bg-gray-100  shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400 font-semibold' onBlur={handleBlur} onChange={handleChange} name='price' value={values.price} />
                        {touched.price && errors.price && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500'>{errors.price}</motion.div>}
                    </aside>
                </div>


                <section className='flex gap-10 w-full mt-4 px-3'>

                    {/* category */}
                    <div className='w-1/3 flex flex-col  gap-3 ' >

                        <motion.p {...pop} className='text-2xl text-gray-700 font-semibold'> Categories</motion.p>
                        {
                            foodCat.map((item) =>
                                <motion.p {...pop} key={item.id} name={item.category} value={values.name} className={`${item.category === values.category ? 'bg-red-500 text-white' : 'bg-transparent'} w-1/2 px-5 py-2 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-300 backdrop-blur-md`} onClick={() => {
                                    console.log(values.category);


                                    handleChange('category')(item.category)
                                }}
                                    onBlur={handleBlur('category')}
                                >
                                    {item.title}
                                </motion.p>
                            )
                        }
                    </div>

                    <motion.section  {...pop} className='w-2/3 overflow-hidden '>
                        {/* image uploader */}


                        <div className=' backdrop-blur-md  w-full h-[300px] rounded-md cursor-pointer flex flex-col relative ' >
                            {
                                values.file === null &&

                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[rgb(225,227,232)] dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">


                                    <DragDrop />

                                    <input id="dropzone-file" type="file" className="hidden"
                                        onChange={(event) => { setFieldValue('file', event.target.files[0]) }} name="file" onBlur={handleBlur} />
                                </label>




                            }

                            {
                                values.file &&
                                <div className='backdrop-blur-md  w-full h-[300px] bg-black rounded-md cursor-pointer flex flex-col relative b'>
                                    <FaTrash className='right-1 top-1 z-30 absolute p-[6px] text-3xl text-gray-200 rounded-full bg-red-600' onClick={() => { setFieldValue('file', null) }} />

                                    <img src={URL.createObjectURL(values.file)} alt="Selected" {...fadeInOut} className="w-full mx-auto  h-full object-cover rounded-md  " />

                                </div>
                            }

                        </div>

                        {/* errors */}
                        {touched.file && errors.file && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500  mx-auto'>{errors.file}</motion.div>}

                        {product.error?.length > 1 &&
                            <motion.div className=' text-red-600 px-2 mt-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                                {product.error}
                            </motion.div>
                        }
                        {product.success?.length > 1 &&
                            <motion.div className=' text-red-600 px-2 mt-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                                {product.success}
                            </motion.div>
                        }


                        {/* button */}
                        <div className='flex  justify-center'>

                            <button {...fadeInOut} {...btnClick} className='bg-red-500 mt-5 rounded-md  py-1 w-2/3 m-0 text-white' type='submit'>Upload now</button>


                        </div>


                    </motion.section>

                </section>






            </aside>







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
