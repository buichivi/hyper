/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                'menu-item-after': 'calc((72px - 100%))',
                'menu-item-after-w': 'calc(100% * 2)',
            },
        },
        fontFamily: {
            Barlow: ['Barlow', 'sans-serif'],
            Oswald: ['Oswald', 'sans-serif'],
            BebasNeue: ['Bebas Neue', 'serif'],
        },
    },
    plugins: [],
};
