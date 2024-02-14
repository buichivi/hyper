import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Navigation, ProductCard } from '../../components';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const Brand = () => {
    const { brandCode, shoeTypeCode } = useParams();

    const [isOpenFilters, setIsOpenFilters] = useState(true);
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [brand, setBrand] = useState({});
    const [products, setProducts] = useState([{}]);

    useEffect(() => {
        window.scrollTo(0, 0);
        request
            .get('/brand/' + brandCode)
            .then((res) => setBrand(res.data.brand));
        request
            .get('/product', {
                brandCode,
                shoeTypeCode,
            })
            .then((res) => console.log(res.data));
    }, [brandCode, shoeTypeCode]);
    return (
        <div className="pb-6">
            <Navigation brandCode={brandCode} />
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
                        All {brand.name}
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
                        <div
                            className="relative flex cursor-pointer select-none items-center 
                                gap-2 px-2 py-1 transition-colors hover:bg-gray-100"
                        >
                            <div
                                className="flex items-center gap-2"
                                onClick={() => setIsOpenSort(!isOpenSort)}
                            >
                                <span>Sort by</span>
                                <IoIosArrowDown className="size-4" />
                            </div>
                            <AnimatePresence>
                                {isOpenSort && (
                                    <motion.div
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                        }}
                                        initial={{
                                            y: -20,
                                            opacity: 0,
                                        }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="absolute right-0 top-full flex w-52 flex-col gap-2 
                                    bg-white py-2 shadow-lg *:text-right *:text-base *:opacity-80 *:transition-colors"
                                    >
                                        <span className="p-1 hover:bg-gray-100 hover:opacity-100">
                                            Newest
                                        </span>
                                        <span className="p-1 hover:bg-gray-100 hover:opacity-100">
                                            Price: High to low
                                        </span>
                                        <span className="p-1 hover:bg-gray-100 hover:opacity-100">
                                            Price: Low to high
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="flex pb-4">
                    <Filter isOpen={isOpenFilters} brand={brand} />
                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                            {products.map((product, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard product={product} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brand;
