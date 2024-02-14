import { IoMdCheckmark } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { filterGroupAnimation } from '../../utils/animation';

const FilterByType = ({ setSaleOffs = () => {} }) => {
    const [isOpen, setIsOpen] = useState(true);

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
                    {['30% off and up', '50% off and up', '70% off and up'].map(
                        (saleItem, index) => {
                            return (
                                <label
                                    key={index}
                                    className="flex select-none items-center justify-start py-1 *:cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        id={`sale-off-option-${index}`}
                                        className={`peer/sale-off hidden`}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSaleOffs((prev) => [
                                                    ...prev,
                                                    saleItem,
                                                ]);
                                            } else
                                                setSaleOffs((prev) =>
                                                    prev.filter(
                                                        (sale) =>
                                                            sale != saleItem,
                                                    ),
                                                );
                                        }}
                                    />
                                    <label
                                        htmlFor={`sale-off-option-${index}`}
                                        className={`flex size-4 items-center justify-center 
                                            ring-1 ring-black
                                            transition-colors
                                            peer-checked/sale-off:bg-black
                                            peer-checked/sale-off:[&>svg]:block peer-checked/sale-off:[&>svg]:text-white
                                        `}
                                    >
                                        <IoMdCheckmark className="hidden text-white" />
                                    </label>
                                    <label
                                        className="pl-2 text-base capitalize"
                                        htmlFor={`sale-off-option-${index}`}
                                    >
                                        {saleItem}
                                    </label>
                                </label>
                            );
                        },
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FilterByType;
