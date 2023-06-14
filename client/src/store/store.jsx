import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice';
import productSlice from './product/productSlice';
import currUserSlice from './user/currUserSlice';
import searchSlice from './product/searchSlice';



const store = configureStore({

    reducer: {
        auth: authSlice,
        product: productSlice,
        currUser: currUserSlice,
        search: searchSlice,

    }
})

export default store;






