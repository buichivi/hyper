import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import {
    FilterByPrice,
    FilterBySaleOff,
    FilterByType,
    FilterByBrand,
    SortInFilterMobile,
} from '..';
import { useParams } from 'react-router-dom';

const MAX_PRICE = 1000;

const Filter = ({
    brand = {},
    shoeTypeCode = '',
    products = [],
    setProductFilters = () => {},
    sort = {},
    setSort = () => {},
    isSearchPage = false,
    className = '',
}) => {
    const { brand_code } = useParams();

    const [filterTypes, setFilterTypes] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [saleOff, setSaleOff] = useState(0);
    const [rangePrice, setRangePrice] = useState([0, MAX_PRICE]);
    const [isReset, setIsReset] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const toggleFilter = useRef();

    console.log('Filter re-render');

    const handleAppyFilter = () => {
        console.log(products);
        const [min, max] = rangePrice;
        if (!isSearchPage)
            setProductFilters(
                products
                    .filter((product) => {
                        const productPriceAfterSaleOff =
                            (product.price * (100 - product.discount)) / 100;
                        if (brand_code)
                            return (
                                filterTypes.includes(product.shoe_type.id) &&
                                productPriceAfterSaleOff >= min &&
                                productPriceAfterSaleOff <= max &&
                                product.discount >= saleOff
                            );
                        return (
                            productPriceAfterSaleOff >= min &&
                            productPriceAfterSaleOff <= max &&
                            product.discount >= saleOff
                        );
                    })
                    .sort(sort.method),
            );
        else
            setProductFilters(
                products
                    .filter((product) => {
                        const productPriceAfterSaleOff =
                            Math.ceil(
                                product.price * (100 - product.discount),
                            ) / 100;
                        return (
                            filterBrands.includes(product.brand.id) &&
                            productPriceAfterSaleOff >= min &&
                            productPriceAfterSaleOff <= max &&
                            product.discount >= saleOff
                        );
                    })
                    .sort(sort.method),
            );
        toggleFilter.current.checked = false;
        window.scrollTo(0, 0);
    };

    const handleResetFilter = () => {
        setProductFilters(products.sort(sort.method));
        setIsReset(!isReset);
        toggleFilter.current.checked = false;
        window.scrollTo(0, 0);
    };

    return (
        <>
            <input
                type="checkbox"
                id="toggle-filter"
                className="peer/toggle-filter hidden"
                ref={toggleFilter}
            />
            <div
                className={`fixed left-0 top-0 z-[3] h-screen w-[100vw] translate-y-full bg-white pt-[15%] transition-all duration-500 peer-checked/toggle-filter:translate-y-0 peer-checked/toggle-filter:overflow-x-hidden peer-checked/toggle-filter:!pr-0 md:sticky md:z-0 md:!mr-4 md:translate-y-0 md:overflow-x-hidden peer-checked/toggle-filter:md:!mr-0 peer-checked/toggle-filter:md:!w-0 ${isAuthenticated ? 'md:top-[calc(72px_+_80px)]' : 'md:top-[calc(100px_+_80px)]'} md:h-full md:!w-[250px] md:overflow-y-auto md:px-0 md:pt-0 md:*:w-[250px] ${className}`}
            >
                <label
                    htmlFor="toggle-filter"
                    className="absolute right-[5%] top-[5%] block cursor-pointer rounded-full bg-black text-white md:hidden"
                >
                    <MdClose className="size-7" />
                </label>
                <SortInFilterMobile
                    isReset={isReset}
                    onChange={({ sort }) => {
                        setSort(sort);
                    }}
                />
                {!shoeTypeCode && !isSearchPage && (
                    <FilterByType
                        isReset={isReset}
                        shoeTypes={brand.shoe_types}
                        onChange={({ filterTypes }) => {
                            setFilterTypes(filterTypes);
                        }}
                    />
                )}
                {isSearchPage && (
                    <FilterByBrand
                        isReset={isReset}
                        onChange={({ filterBrands }) => {
                            setFilterBrands(filterBrands);
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
            </div>
        </>
    );
};

Filter.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpenFilters: PropTypes.func,
    brand: PropTypes.object,
    shoeTypeCode: PropTypes.string,
    setProductFilters: PropTypes.func,
    products: PropTypes.array,
    sort: PropTypes.object,
    isSearchPage: PropTypes.bool,
    className: PropTypes.string,
    setSort: PropTypes.func,
};

export default Filter;
