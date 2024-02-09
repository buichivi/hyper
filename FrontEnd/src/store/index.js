import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        // create user slice
        user: userReducer,
    },
});
