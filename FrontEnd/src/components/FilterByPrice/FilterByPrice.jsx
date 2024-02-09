import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

function SliderPrice({ valuePrice = 50, max = 0, onChange = () => {} }) {
    const [value, setValue] = useState(valuePrice);
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
        <div
            className={`pt-4 ${isOpen ? 'h-28' : 'h-16'} cursor-pointer
        select-none overflow-hidden border-b-[1px] border-b-[#B9B4C7]
        py-4 transition-all duration-500`}
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
                variants={animation}
                exit="exit"
                transition={{ duration: 0.5 }}
                className="px-4 py-4"
            >
                <div className="relative h-1 bg-slate-300">
                    <input
                        type="range"
                        className="peer/slider-price absolute left-0 top-0 z-10 h-full w-full 
                            appearance-none rounded-full bg-transparent
                            accent-black
                            [&::-webkit-slider-runnable-track]:appearance-none
                            [&::-webkit-slider-runnable-track]:bg-transparent
                            [&::-webkit-slider-thumb]:h-3
                            [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:cursor-grab
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-[#fff]
                            [&::-webkit-slider-thumb]:ring-2
                            [&::-webkit-slider-thumb]:ring-black
                            "
                        min={0}
                        max={max}
                        step="1"
                        value={value}
                        onChange={(e) => {
                            setValue(Number(e.target.value));
                            onChange(Number(e.target.value));
                        }}
                    />
                    <span
                        className={`before:border-b-1 absolute top-4 flex h-fit w-fit items-center justify-center rounded-md bg-black 
                        px-2 py-1 text-white opacity-0 transition-all
                        before:absolute before:-top-3 before:left-1/2
                        before:h-0 before:w-0 before:-translate-x-1/2 before:border-[8px] 
                        before:border-b-black before:border-l-transparent before:border-r-transparent 
                        before:border-t-transparent before:content-[''] peer-hover/slider-price:opacity-100`}
                        style={{
                            left: (value * 100) / max + '%',
                            transform: `translateX(-${(value * 100) / max}%)`,
                        }}
                    >
                        ${value}
                    </span>
                    <div
                        className={`absolute left-0 top-0 -z-0 h-1 bg-black`}
                        style={{ width: (value * 100) / max + '%' }}
                    ></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span>$0</span>
                    <span>${max}</span>
                </div>
            </motion.div>
        </div>
    );
}

export default SliderPrice;
