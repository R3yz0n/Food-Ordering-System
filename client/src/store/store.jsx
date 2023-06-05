import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice';
import productSlice from './product/productSlice';
import currUserSlice from './user/currUserSlice';



const store = configureStore({

    reducer: {
        auth: authSlice,
        product: productSlice,
        currUser: currUserSlice

    }
})

export default store;






