import { IoMdCheckmark } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { filterGroupAnimation } from '../../utils/animation';

const FilterByType = ({ setFilterTypes = () => {}, brandTypes = [] }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div
            className={`h-auto cursor-pointer select-none border-b-[1px]
            border-b-[#B9B4C7] py-2 transition-all duration-500
    `}
        >
            <div
                className="flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium">Types</h3>
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
                {brandTypes.map((type, index) => {
                    return (
                        <label
                            key={index}
                            className="flex select-none items-center justify-start py-1 *:cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id={`type-filter-${index}`}
                                className={`peer/type-filter hidden`}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilterTypes((prev) => [
                                            ...prev,
                                            type.id,
                                        ]);
                                    } else
                                        setFilterTypes((prev) =>
                                            prev.filter(
                                                (filterType) =>
                                                    filterType != type.id,
                                            ),
                                        );
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
                                {type.name}
                            </label>
                        </label>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default FilterByType;
