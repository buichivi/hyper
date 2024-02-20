// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Tippy css
import 'tippy.js/dist/tippy.css';

// Import React-Toastify css
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout/MainLayout';
import publicRoutes from './routes';
import { ProtectedRoute } from './components';
import { Login, SignUp } from './pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkingLoginUser } from './store/actions';
import { fetchCart } from './store/cartSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkingLoginUser());
        dispatch(fetchCart());
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map(
                    ({ component: Component, path, authRequired }, index) => {
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <ProtectedRoute authRequired={authRequired}>
                                        <MainLayout>
                                            <Component />
                                        </MainLayout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    },
                )}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
