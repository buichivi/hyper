import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';
import { AnimatePresence, motion } from 'framer-motion';
import { IoBag, IoBagHandle } from 'react-icons/io5';

const ProductCard = ({ product = {} }) => {
    const [isFavor, setIsFavor] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="select-none overflow-hidden border-[1px] border-transparent">
            <Link
                to={`/product/${product.id}`}
                className="relative block w-full overflow-hidden "
                style={{ aspectRatio: 1 }}
            >
                <img
                    src="https://shorturl.at/nszNY"
                    alt=""
                    className="h-full w-full rounded-lg object-cover transition-all duration-500"
                />
                {!isSelected && (
                    <div
                        className="absolute right-2 top-2 z-20 size-8 cursor-pointer rounded-full bg-black md:size-9 
                    [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsFavor(!isFavor);
                        }}
                    >
                        {!isFavor ? (
                            <IoIosHeartEmpty className="size-4 text-white md:size-6" />
                        ) : (
                            <IoIosHeart className="size-4 text-white md:size-6" />
                        )}
                    </div>
                )}

                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            className="absolute bottom-0 right-0 z-20 h-1/2 w-full 
                            cursor-default overflow-y-auto bg-[#000000b9] [&::-webkit-scrollbar]:hidden "
                            onClick={(e) => e.preventDefault()}
                        >
                            <div className="relative grid grid-cols-4 gap-2 p-2">
                                {[39, 40, 41, 43, 39].map((size, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="relative h-10 cursor-pointer p-1
                                            text-center text-white ring-1 ring-white hover:bg-white hover:text-black"
                                        >
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                                {size}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlay when select size */}
                <div
                    className={`absolute left-0 top-0 h-full w-full ${
                        isSelected ? 'bg-[#0000008f]' : 'bg-transparent'
                    } transition-colors duration-300`}
                ></div>
            </Link>
            <div className="flex items-center justify-between p-2">
                <div className="flex-1 shrink-0">
                    <Link
                        to={`/product/${product.id}`}
                        className="text-limit-1 text-lg font-medium"
                    >
                        Nike Air Force 1
                    </Link>
                    <span className="font-medium">$200</span>
                </div>
                <IoBagHandle
                    className="box-content size-6 cursor-pointer rounded-full 
                    bg-white p-2 text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    onClick={() => setIsSelected(!isSelected)}
                />
            </div>
        </div>
    );
};

export default ProductCard;
