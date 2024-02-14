import { useState } from 'react';
import { FilterByPrice, FilterBySaleOff, FilterByType } from '..';
import { motion, AnimatePresence } from 'framer-motion';

const Filter = ({ isOpen = true, brand = {} }) => {
    const [filterTypes, setFilterTypes] = useState([]);
    const [saleOffs, setSaleOffs] = useState([]);
    const [maxPrice, setMaxPrice] = useState(50);

    const toggleOpen = {
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
                    className="sticky top-[calc(72px_+_80px)] h-[calc(100vh_-_72px_-_80px)] w-[220px] overflow-y-auto"
                    animate="open"
                    initial="exit"
                    exit="exit"
                    variants={toggleOpen}
                >
                    <FilterByType
                        setFilterTypes={setFilterTypes}
                        brandTypes={brand.shoe_types}
                    />
                    <FilterByPrice
                        valuePrice={maxPrice}
                        max={200}
                        onChange={setMaxPrice}
                    />
                    <FilterBySaleOff setSaleOffs={setSaleOffs} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Filter;
