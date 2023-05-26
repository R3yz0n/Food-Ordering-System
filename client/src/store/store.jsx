import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice';
import productSlice from './product/productSlice';



const store = configureStore({

    reducer: {
        auth: authSlice,
        product: productSlice

    }
})

export default store;






