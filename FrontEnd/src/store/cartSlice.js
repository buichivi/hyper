import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../utils/request';

const initialState = {
    items: [],
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const res = await request.get('/me/cart');
    const data = await res.data.cart;
    console.log(data);
    return data;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id == id);
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.items.push(action.payload);
            }
            console.log(state.items);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id != action.payload.id,
            );
        },
        updateItem: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id == id);
            existingItem.quantity = quantity;
        },
        clearCart: (state) => {
            state.items = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload; //Update cart from db
        });
    },
});

export const { addItem, clearCart, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
