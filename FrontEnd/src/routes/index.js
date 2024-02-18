import { Home, Brand, Product, CheckOut, Favorites } from '../pages';

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
        path: '/:brand_code/:shoe_type_code/:product_id',
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
    {
        path: '/favorites',
        component: Favorites,
        title: 'Favorites',
        authRequired: false,
    },
];

export default publicRoutes;
