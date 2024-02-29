import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { filterGroupAnimation } from '../../utils/animation';
import { SORT_PRODUCT } from '../../constants';
import PropTypes from 'prop-types';

const SortInFilterMobile = ({ isReset, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [sort, setSort] = useState();

    useEffect(() => {
        onChange({ sort });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    useEffect(() => {
        setSort();
    }, [isReset]);

    return (
        <motion.div
            className={`block cursor-pointer select-none overflow-hidden border-b-[1px] border-b-[#B9B4C7] px-[10%] py-2 transition-all duration-500 md:hidden md:px-0
    `}
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium">Sort</h3>
                {isOpen ? (
                    <FiMinus className={`size-5 transition-all duration-500`} />
                ) : (
                    <FiPlus className={`size-5 transition-all duration-500`} />
                )}
            </div>

            <motion.div
                animate={isOpen ? 'open' : 'exit'}
                initial="exit"
                variants={filterGroupAnimation}
                exit="exit"
                transition={{ type: 'spring', duration: 0.7 }}
                className="px-4"
            >
                <div className="py-2">
                    {SORT_PRODUCT.map((sortItem, index) => {
                        console.log(sort?.name, sortItem.name);
                        return (
                            <label
                                key={index}
                                className="flex select-none items-center justify-start py-1 *:cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    id={`sort-option-${index}`}
                                    className={`peer/sort accent-black`}
                                    name="sort"
                                    checked={sort?.name == sortItem.name}
                                    onChange={() => setSort(sortItem)}
                                />
                                <label
                                    className="pl-2 text-base capitalize"
                                    htmlFor={`sort-option-${index}`}
                                >
                                    {sortItem.name}
                                </label>
                            </label>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
};

SortInFilterMobile.propTypes = {
    isReset: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default SortInFilterMobile;
