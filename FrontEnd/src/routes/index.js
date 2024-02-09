import { Home, Brand, Product, CheckOut, Login } from '../pages';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        title: 'Home',
        authRequired: false
    },
    {
        path: '/:brandId',
        component: Brand,
        title: 'Brand',
        authRequired: false
    },
    {
        path: '/product/:prodId',
        component: Product,
        title: 'Product',
        authRequired: false
    },
    {
        path: '/checkout',
        component: CheckOut,
        title: 'CheckOut',
        authRequired: true
    },
];

export default publicRoutes;
