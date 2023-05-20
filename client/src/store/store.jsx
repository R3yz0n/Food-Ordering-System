import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './slices/userSlice'
import userSlice from './slices/userSlice'



// const authSlice = createSlice()
const store = configureStore({

    reducer: {
        user: userSlice,

    }
})

export default store;






