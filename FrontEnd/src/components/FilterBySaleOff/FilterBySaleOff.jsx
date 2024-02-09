import { IoMdCheckmark } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const FilterByType = ({ setSaleOffs = () => {} }) => {
    const [isOpen, setIsOpen] = useState(true);

    const animation = {
        open: {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            userSelect: 'auto',
        },
        exit: {
            y: -40,
            opacity: 0,
            visibility: 'hidden',
            userSelect: 'none',
        },
    };

    return (
        <motion.div
            className={`${isOpen ? 'h-44' : 'h-16'} cursor-pointer select-none
            overflow-hidden border-b-[1px] border-b-[#B9B4C7] py-4 transition-all duration-500
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
                variants={animation}
                exit="exit"
                transition={{ duration: 0.7 }}
                className="px-4 py-2"
            >
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
            </motion.div>
        </motion.div>
    );
};

export default FilterByType;
