import { IoMdCheckmark } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { filterGroupAnimation } from '../../utils/animation';
import PropTypes from 'prop-types';

const FilterByType = ({ isReset, shoeTypes = [], onChange }) => {
    console.log('FilterByType re-render');

    const [isOpen, setIsOpen] = useState(true);
    const [filterTypes, setFilterTypes] = useState([]);

    useEffect(() => {
        setFilterTypes(shoeTypes.map((shoeType) => shoeType.id));
    }, [isReset, shoeTypes.length, shoeTypes]);

    useEffect(() => {
        onChange({ filterTypes });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTypes.length]);

    return (
        <motion.div
            className={`h-auto cursor-pointer select-none border-b-[1px] border-b-[#B9B4C7] px-[10%] py-2 transition-all duration-500 md:px-0
    `}
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium">Product Type</h3>
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
                className="overflow-hidden px-4"
            >
                {shoeTypes.map((shoeType, index) => {
                    return (
                        <label
                            key={index}
                            className="flex select-none items-center justify-start py-1 *:cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id={`type-filter-${index}`}
                                className={`peer/type-filter hidden`}
                                checked={filterTypes.includes(shoeType.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilterTypes((prev) => [
                                            ...prev,
                                            shoeType.id,
                                        ]);
                                    } else {
                                        setFilterTypes((prev) =>
                                            prev.filter(
                                                (type) => type != shoeType.id,
                                            ),
                                        );
                                    }
                                }}
                            />
                            <label
                                htmlFor={`type-filter-${index}`}
                                className={`flex size-4 items-center justify-center 
                                        ring-1 ring-black
                                        transition-colors
                                        peer-checked/type-filter:bg-black
                                        peer-checked/type-filter:[&>svg]:block peer-checked/type-filter:[&>svg]:text-white
                                    `}
                            >
                                <IoMdCheckmark className="hidden text-white" />
                            </label>
                            <label
                                className="pl-2 text-lg capitalize"
                                htmlFor={`type-filter-${index}`}
                            >
                                {shoeType.name}
                            </label>
                        </label>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

FilterByType.propTypes = {
    isReset: PropTypes.bool,
    shoeTypes: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

export default FilterByType;
