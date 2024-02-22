import {
    Home,
    Brand,
    Product,
    CheckOut,
    Favorites,
    Cart,
    Search,
} from '../pages';

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
    {
        path: '/cart',
        component: Cart,
        title: 'Cart',
        authRequired: true,
    },
    {
        path: '/search',
        component: Search,
        title: 'Search',
        authRequired: false,
    },
];

export default publicRoutes;
