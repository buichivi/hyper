import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Navigation, ProductCard } from '../../components';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { useCallback, useEffect, useState } from 'react';
import request from '../../utils/request';
import { SORT_PRODUCT } from '../../constants';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Brand = () => {
    const { brand_code, shoe_type_code } = useParams();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const [isOpenFilters, setIsOpenFilters] = useState(true);
    const [brand, setBrand] = useState({});
    const [products, setProducts] = useState([]);
    const [productFilters, setProductFilters] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [sort, setSort] = useState({});
    const [path, setPath] = useState([]);

    const favorite_product_ids = favoriteProducts.map((prod) => prod.id);

    console.log(
        productFilters.map((prod) => {
            return {
                date: prod.manufacture_date,
                price: Math.ceil((prod.price * (100 - prod.discount)) / 100),
            };
        }),
    );

    const shoe_type = brand?.shoe_types?.filter(
        (shoe_type) => shoe_type.code == shoe_type_code,
    )[0];

    console.log('Brand re-render');

    const loadData = useCallback(async () => {
        await request
            .get('/brand/' + brand_code)
            .then((res) => setBrand(res.data.brand));
        await request
            .get('/products', {
                params: {
                    brand_code: brand_code,
                    shoe_type_code: shoe_type_code,
                },
            })
            .then((res) => {
                setProducts(res.data.products);
                setProductFilters(res.data.products);
            });
        if (isAuthenticated) {
            await request
                .get('/me/favorites')
                .then((res) => setFavoriteProducts(res.data.favorite_products));
        }
    }, [brand_code, shoe_type_code, isAuthenticated]);

    useEffect(() => {
        console.log('Set path');
        if (shoe_type_code)
            setPath([
                {
                    name: brand?.name,
                    path: '/' + brand?.code,
                },
                {
                    name: shoe_type?.name,
                    path: '/' + brand?.code + '/' + shoe_type?.code,
                },
            ]);
        else
            setPath([
                {
                    name: brand?.name,
                    path: '/' + brand?.code,
                },
            ]);
    }, [brand_code, shoe_type_code, brand, shoe_type]);

    useEffect(() => {
        console.log('loaddata');
        window.scrollTo(0, 0);
        loadData();
    }, [brand_code, shoe_type_code, loadData]);

    console.log(brand);

    return (
        <div className="pb-6">
            <Navigation path={path} />
            <div>
                <div className="flex h-[200px] w-full items-center justify-center bg-black">
                    <div className="flex size-40 items-center justify-center text-white">
                        <img
                            src={brand.img_url}
                            alt={brand.name}
                            className="size-full object-contain invert"
                        />
                    </div>
                </div>
                <div className="sticky top-[72px] z-30 flex h-[80px] items-center justify-between bg-white py-4">
                    <h4 className="text-4xl font-medium capitalize">
                        {!shoe_type_code
                            ? `All ${brand.name}`
                            : shoe_type?.name}
                    </h4>
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <div
                            className="flex cursor-pointer select-none items-center gap-1
                            px-2 py-1 transition-colors hover:bg-gray-100"
                            onClick={() => setIsOpenFilters(!isOpenFilters)}
                        >
                            <span>
                                {isOpenFilters ? 'Hide' : 'Open'} Filters
                            </span>
                            <PiSlidersHorizontal className="size-6" />
                        </div>
                        <SortProduct
                            sort={sort}
                            onChange={({ sortOption }) => {
                                setSort(sortOption);
                                setProductFilters((prev) => {
                                    const productSorted = prev.sort(
                                        sortOption?.method,
                                    );
                                    return [...productSorted];
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="flex pb-4">
                    <Filter
                        isOpen={isOpenFilters}
                        brand={brand}
                        shoeTypeCode={shoe_type_code}
                        setProductFilters={setProductFilters}
                        products={products}
                        sort={sort}
                    />
                    <div className="flex-1">
                        {productFilters?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                                {productFilters.map((product, index) => {
                                    return (
                                        <ProductCard
                                            key={index}
                                            product={product}
                                            isFavorite={favorite_product_ids.includes(
                                                product.id,
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-60">
                                <div className="flex items-center justify-center text-center">
                                    <img
                                        src="/src/assets/images/open-box.png"
                                        alt=""
                                        className="size-60 object-cover"
                                    />
                                </div>
                                <h3
                                    className="text-center font-BebasNeue text-3xl font-medium capitalize tracking-widest
                                    text-slate-400"
                                >
                                    No product found
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SortProduct = ({ onChange = () => {} }) => {
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [sortOption, setSortOption] = useState();

    console.log('Sort Product re-render');

    useEffect(() => {
        onChange({ sortOption });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOption]);

    return (
        <div
            className="relative flex cursor-pointer select-none items-center 
            gap-2 px-2 py-1 transition-colors hover:bg-gray-100"
        >
            <div
                className="flex items-center gap-2"
                onClick={() => setIsOpenSort(!isOpenSort)}
            >
                <span>Sort by</span>
                {sortOption?.name && <span>- {sortOption?.name}</span>}
                <IoIosArrowDown className="size-4" />
            </div>
            <AnimatePresence>
                {isOpenSort && (
                    <motion.div
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        className="absolute right-0 top-full flex w-52 flex-col gap-2 overflow-hidden
                                    bg-white shadow-lg *:text-right *:text-base *:opacity-80 *:transition-colors [&>span]:p-2"
                    >
                        {SORT_PRODUCT.map((sortItem, index) => {
                            return (
                                <span
                                    key={index}
                                    className="p-1 hover:bg-gray-100 hover:opacity-100"
                                    onClick={() => {
                                        setSortOption(sortItem);
                                        setIsOpenSort(false);
                                    }}
                                >
                                    {sortItem.name}
                                </span>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

SortProduct.propTypes = {
    onChange: PropTypes.func,
};

export default Brand;
