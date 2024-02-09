import request from '../utils/request';
import { checkLogin, logIn, logOut } from './userSlice';
import { toast } from 'react-toastify';

export const logInUser = (values, navigate) => async (dispatch) => {
    request
        .post(
            '/login',
            {
                email: values.email,
                password: values.password,
            },
            { withCredentials: true },
        )
        .then((res) => {
            dispatch(logIn(res.data));
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
        .get('/logout', { withCredentials: true })
        .then(() => {
            dispatch(logOut());
            toast.success('Log out successfully!');
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
};

export const checkingLoginUser = () => async (dispatch) => {
    request.get('/checking-login', { withCredentials: true }).then((res) => {
        dispatch(checkLogin(res.data));
    });
};
