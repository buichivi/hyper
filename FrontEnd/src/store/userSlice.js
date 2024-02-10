import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // user reducers
        logIn: (state, action) => {
            state.isInitialized = true; // make animation
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        checkLogin: (state, action) => {
            state.isAuthenticated = action.payload?.logged_in;
            state.user = action.payload?.user || null;
        },
    },
});

export const { logIn, logOut, checkLogin } = userSlice.actions;
export default userSlice.reducer;
