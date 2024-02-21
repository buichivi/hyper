import request from '../utils/request';
import {
    addItem,
    clearCart,
    fetchCart,
    removeItem,
    updateItem,
} from './cartSlice';
import { checkLogin, logIn, logOut } from './userSlice';
import { toast } from 'react-toastify';

export const logInUser = (values, navigate) => async (dispatch) => {
    request
        .get('/login', {
            params: {
                email: values.email,
                password: values.password,
                remember: values.remember,
            },
        })
        .then((res) => {
            dispatch(logIn(res.data));
            dispatch(fetchCart());
            navigate('/');
            setTimeout(() => {
                toast.success('Logged in successfully!');
            }, 500);
        })
        .catch((err) => {
            toast.error(err?.response?.data?.message || 'Login failed!');
        });
};

export const logOutUser = () => async (dispatch) => {
    request
        .get('/logout')
        .then(() => {
            localStorage.setItem('isAuthenticated', false);
            dispatch(logOut());
            dispatch(clearCart());
            toast.success('Log out successfully!');
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
};

export const checkingLoginUser = () => async (dispatch) => {
    request
        .get('/checking-login')
        .then((res) => {
            dispatch(checkLogin(res.data));
            dispatch(fetchCart());
            console.log(res.data.current_user);
        })
        .catch((err) => {
            console.log(err);
            localStorage.setItem('isAuthenticated', false);
        });
};

export const addItemToCart = (cartItem) => async (dispatch) => {
    request
        .post('/me/cart', { ...cartItem })
        .then((res) => {
            toast.success(res.data.message);
            dispatch(addItem(res.data.cart_item));
        })
        .catch((err) =>
            toast.error(err.response.data.message || 'Somthing went wrong'),
        );
};

export const removeItemFromCart = (cartItemId) => async (dispatch) => {
    request
        .delete('/me/cart', { params: { cart_item_id: cartItemId } })
        .then((res) => {
            toast.success(res.data.message);
            dispatch(removeItem(res.data.cart_item));
        })
        .catch((err) =>
            toast.error(err.response.data.message || 'Somthing went wrong'),
        );
};

export const updateItemFromCart = (cartItem) => async (dispatch) => {
    if (cartItem.quantity == 0) {
        request
            .delete('/me/cart', { params: { cart_item_id: cartItem.id } })
            .then((res) => {
                toast.success(res.data.message);
                dispatch(removeItem(res.data.cart_item));
            })
            .catch((err) =>
                toast.error(err.response.data.message || 'Somthing went wrong'),
            );
    } else {
        request
            .patch('/me/cart/update', {
                cart_item_id: cartItem.id,
                quantity: cartItem.quantity,
            })
            .then((res) => {
                toast.success(res.data.message);
                dispatch(updateItem(res.data.cart_item));
            })
            .catch((err) => {
                toast.error(err.response.data.message || 'Somthing went wrong');
            });
    }
};

export const clearAllItemFromCart = () => async (dispatch) => {
    await request
        .delete('/me/cart/clear')
        .then((res) => {
            dispatch(clearCart());
            toast.success(res.data.message);
        })
        .catch((err) =>
            toast.error(err.response.data.message || 'Somthing went wrong'),
        );
};
