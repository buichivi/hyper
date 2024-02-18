import { createSlice } from '@reduxjs/toolkit';

const isAuthenticatedSaved =
    JSON.parse(localStorage.getItem('isAuthenticated')) || false;
const initialState = {
    isInitialized: false,
    isAuthenticated: isAuthenticatedSaved,
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
            localStorage.setItem('isAuthenticated', true);
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        checkLogin: (state, action) => {
            localStorage.setItem('isAuthenticated', action.payload.logged_in);
            state.isAuthenticated = action.payload.logged_in;
            state.user = action.payload?.user || null;
            console.log(state.user);
        },
    },
});

export const { logIn, logOut, checkLogin } = userSlice.actions;
export default userSlice.reducer;
