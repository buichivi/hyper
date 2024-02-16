import { useState } from 'react';
import { FilterByPrice, FilterBySaleOff, FilterByType } from '..';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import PropTypes from 'prop-types';

const MAX_PRICE = 1000;

const Filter = ({
    isOpen = true,
    brand = {},
    shoeTypeCode = '',
    setProductFilters = () => {},
    products = [],
}) => {
    const [filterTypes, setFilterTypes] = useState([]);
    const [saleOff, setSaleOff] = useState(0);
    const [rangePrice, setRangePrice] = useState([0, MAX_PRICE]);
    const [isReset, setIsReset] = useState(false);

    const handleAppyFilter = () => {
        const [min, max] = rangePrice;
        setProductFilters(
            products.filter((product) => {
                const productPriceAfterSaleOff =
                    (product.price * (100 - product.discount)) / 100;
                return (
                    filterTypes.includes(product.shoe_type_id) &&
                    productPriceAfterSaleOff >= min &&
                    productPriceAfterSaleOff <= max &&
                    product.discount >= saleOff
                );
            }),
        );
    };

    const handleResetFilter = () => {
        setProductFilters(products);
        setIsReset(!isReset);
    };

    const toggleOpenFilter = {
        open: {
            x: 0,
            opcacity: 1,
            width: 220,
            marginRight: 16,
        },
        exit: {
            x: -100,
            opcacity: 0,
            width: 0,
            marginRight: 0,
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="sticky top-[calc(72px_+_80px)] h-full w-[220px] overflow-y-auto"
                    animate="open"
                    initial="exit"
                    exit="exit"
                    variants={toggleOpenFilter}
                >
                    {!shoeTypeCode && (
                        <FilterByType
                            isReset={isReset}
                            shoeTypes={brand.shoe_types}
                            onChange={({ filterTypes }) => {
                                setFilterTypes(filterTypes);
                            }}
                        />
                    )}
                    <FilterByPrice
                        isReset={isReset}
                        maxPrice={MAX_PRICE}
                        setRangePrice={setRangePrice}
                    />
                    <FilterBySaleOff
                        isReset={isReset}
                        onChange={({ saleOff }) => {
                            setSaleOff(saleOff);
                        }}
                    />
                    <div className="flex items-center justify-around py-4">
                        <button
                            onClick={handleAppyFilter}
                            className="relative flex items-center justify-around gap-2 
                            border border-transparent bg-black px-6 py-2
                            text-white transition-all duration-500 before:absolute 
                            before:left-1 before:top-1 before:-z-10 before:h-full 
                            before:w-full before:bg-white before:ring-1 
                            before:ring-black before:transition-all 
                            before:duration-500 before:content-[''] hover:border-black
                            hover:bg-white hover:text-black hover:before:bg-black"
                        >
                            Apply
                            <span>
                                <HiOutlineArrowNarrowRight className="size-6" />
                            </span>
                        </button>
                        <button
                            onClick={handleResetFilter}
                            className="border border-black bg-white px-4 py-2 text-black
                            transition-all duration-500 hover:bg-black hover:text-white"
                        >
                            Reset
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Filter.propTypes = {
    isOpen: PropTypes.bool,
    brand: PropTypes.object,
    shoeTypeCode: PropTypes.string,
    setProductFilters: PropTypes.func,
    products: PropTypes.array,
};

export default Filter;
