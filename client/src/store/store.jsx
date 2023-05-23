import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice';



const store = configureStore({

    reducer: {
        auth: authSlice,

    }
})

export default store;






