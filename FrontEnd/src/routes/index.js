import { Home, Brand, Product, CheckOut, Login } from '../pages';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        title: 'Home',
        authRequired: false,
    },
    {
        path: '/:brand_code',
        component: Brand,
        title: 'Brand',
        authRequired: false,
    },
    {
        path: '/:brand_code/:shoe_type_code',
        component: Brand,
        title: 'Brand',
        authRequired: false,
    },
    {
        path: '/product/:product_id',
        component: Product,
        title: 'Product',
        authRequired: false,
    },
    {
        path: '/checkout',
        component: CheckOut,
        title: 'CheckOut',
        authRequired: true,
    },
];

export default publicRoutes;
