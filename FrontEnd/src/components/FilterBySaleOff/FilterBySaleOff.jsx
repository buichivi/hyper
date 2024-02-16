import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { filterGroupAnimation } from '../../utils/animation';
import { SALE_OFFS } from '../../constants';
import PropTypes from 'prop-types';

const FilterBySaleOff = ({ isReset, onChange }) => {
    console.log('FilterBySaleOff re-render');
    const [isOpen, setIsOpen] = useState(true);
    const [saleOff, setSaleOff] = useState(0);

    useEffect(() => {
        onChange({ saleOff });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleOff]);

    useEffect(() => {
        setSaleOff(0);
    }, [isReset]);

    return (
        <motion.div
            className={`cursor-pointer select-none
            overflow-hidden border-b-[1px] border-b-[#B9B4C7] py-2 transition-all duration-500
    `}
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium">Sale off</h3>
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
                    {SALE_OFFS.map(({ name, value }, index) => {
                        return (
                            <label
                                key={index}
                                className="flex select-none items-center justify-start py-1 *:cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    id={`sale-off-option-${index}`}
                                    className={`peer/sale-off accent-black`}
                                    name="sale-off"
                                    checked={saleOff == value}
                                    onChange={() => setSaleOff(value)}
                                />
                                <label
                                    className="pl-2 text-base capitalize"
                                    htmlFor={`sale-off-option-${index}`}
                                >
                                    {name}
                                </label>
                            </label>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
};

FilterBySaleOff.propTypes = {
    isReset: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default FilterBySaleOff;
