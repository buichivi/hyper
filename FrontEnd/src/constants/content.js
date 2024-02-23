const DEMO_CONTENT = {
    description: `<h1>It is a long established</h1>
        <p>fact that a reader will be distracted by 
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal distribution 
        of letters, as opposed to using 'Content here, content here', making it 
        look like readable English. Many desktop publishing packages and web 
        page editors now use Lorem Ipsum as their default model text, and a 
        search for 'lorem ipsum' will uncover many web sites still in their 
        infancy. Various versions have evolved over the years, sometimes by 
        accident, sometimes on purpose (injected humour and the like).<p>
        <p>fact that a reader will be distracted by 
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal distribution 
        of letters, as opposed to using 'Content here, content here', making it 
        look like readable English. Many desktop publishing packages and web 
        page editors now use Lorem Ipsum as their default model text, and a 
        search for 'lorem ipsum' will uncover many web sites still in their 
        infancy. Various versions have evolved over the years, sometimes by 
        accident, sometimes on purpose (injected humour and the like).<p>`,
    review: {
        average: 4.4,
        review_details: [
            {
                user_id: '1',
                user_name: 'James',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 4,
                date: '1/25/2024',
            },
            {
                user_id: '2',
                user_name: 'Bryan',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 3,
                date: '1/24/2024',
            },
            {
                user_id: '3',
                user_name: 'Jack',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 5,
                date: '1/23/2024',
            },
            {
                user_id: '1',
                user_name: 'James',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 4,
                date: '1/22/2024',
            },
            {
                user_id: '2',
                user_name: 'Bryan',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 3,
                date: '1/21/2024',
            },
            {
                user_id: '3',
                user_name: 'Jack',
                review_title: 'Nice shoe!',
                review_content: `It's really good! I'm happy with that`,
                voted: 5,
                date: '1/20/2024',
            },
        ],
    },
};

const SORT_COMMENT = [
    {
        name: 'Newest',
        method: (a, b) => {
            return (
                new Date(b?.comment_on).getTime() -
                new Date(a?.comment_on).getTime()
            );
        },
    },
    {
        name: 'Highest rated',
        method: (a, b) => {
            return b?.rating - a?.rating;
        },
    },
    {
        name: 'Lowest rated',
        method: (a, b) => {
            return a?.rating - b?.rating;
        },
    },
];

const SORT_PRODUCT = [
    {
        name: 'Newest',
        method: (a, b) => {
            function parseDate(dateString) {
                var parts = dateString.split('/');
                return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
            }

            var date1 = parseDate(a?.manufacture_date);
            var date2 = parseDate(b?.manufacture_date);
            console.log(date1, date2);
            return date1 - date2;
        },
    },
    {
        name: 'Price: High to low',
        method: (a, b) => {
            const aPriceAfterSale = Math.ceil(
                (a?.price * (100 - a?.discount)) / 100,
            );
            const bPriceAfterSale = Math.ceil(
                (b?.price * (100 - b?.discount)) / 100,
            );
            return bPriceAfterSale - aPriceAfterSale;
        },
    },
    {
        name: 'Price: Low to high',
        method: (a, b) => {
            const aPriceAfterSale = Math.ceil(
                (a?.price * (100 - a?.discount)) / 100,
            );
            const bPriceAfterSale = Math.ceil(
                (b?.price * (100 - b?.discount)) / 100,
            );
            return aPriceAfterSale - bPriceAfterSale;
        },
    },
];

export { DEMO_CONTENT, SORT_COMMENT, SORT_PRODUCT };
