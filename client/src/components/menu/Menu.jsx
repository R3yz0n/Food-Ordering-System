import React, { useEffect, useState } from 'react';
import MenuCat from './MenuCat';
import { useDispatch, useSelector } from 'react-redux';
import FoodItemCard from './FoodItemCard';
import './Swiper.css'
import 'swiper/css/bundle'
import { getAllItems, searchItems } from '../../store/product/productAction';
import { clearFields } from '../../store/product/productSlice'


const Menu = () => {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.product)
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState({ searchKeyword: '', category: '', status: false })

    const handleSearch = (value) => {
        setSearch({ ...search, searchKeyword: value, category: category, status: true })

    }



    useEffect(() => {
        const id = setTimeout(() => {
            if (search.status)
                dispatch(searchItems(search)).then(res => dispatch(clearFields()))


        }, [1000])

        return () => { clearTimeout(id) }


    }, [search, dispatch])



    const handleFilter = (category) => {
        setCategory(category);
    }

    useEffect(() => {

        dispatch(getAllItems(category)).then(res => dispatch(clearFields()))

    }, [dispatch, category])


    return (
        <main className=' pt-[90px]  pb-20 '>

            <MenuCat handleFilter={handleFilter} category={category} handleSearch={handleSearch} searchKeyword={search.searchKeyword} />

            <div className='mt-10 max-w-screen-lg xl:max-w-screen-xl gap-x-0  mx-auto   grid  xs:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-y-5   lg:p-0 '>
                {
                    items?.map((item) => <FoodItemCard key={item.id} item={item} />)

                }
            </div>

        </main>
    );
};

export default Menu;



