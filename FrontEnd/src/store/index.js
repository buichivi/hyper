import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        // create user slice
        user: userReducer,
        cart: cartReducer,
    },
});
