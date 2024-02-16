import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { filterGroupAnimation } from '../../utils/animation';
import { MultipleRange } from '../';
import PropTypes from 'prop-types';

function FilterByPrice({ isReset, maxPrice = 0, setRangePrice = () => {} }) {
    console.log("FilterByPrice re-render");
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setRangePrice([0, maxPrice]);
    }, [isReset, setRangePrice, maxPrice]);

    return (
        <div
            className={`cursor-pointer select-none
            overflow-hidden border-b-[1px] border-b-[#B9B4C7] pt-2 transition-all duration-500`}
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium">Price</h3>
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
                className={`overflow-hidden px-4 pb-2`}
            >
                <MultipleRange
                    min={0}
                    max={maxPrice}
                    onChange={({ min, max }) => {
                        setRangePrice([min, max]);
                    }}
                    isReset={isReset}
                />
            </motion.div>
        </div>
    );
}

FilterByPrice.propTypes = {
    isReset: PropTypes.bool,
    maxPrice: PropTypes.number.isRequired,
    setRangePrice: PropTypes.func.isRequired,
};

export default FilterByPrice;
