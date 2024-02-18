import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { IoBagHandle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ product = {} }) => {
    const [isFavor, setIsFavor] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        <div className="select-none overflow-hidden border-[1px] border-transparent">
            <Link
                to={`/${product?.brand?.code}/${product?.shoe_type?.code}/${product?.id}`}
                className="relative block w-full overflow-hidden"
                style={{ aspectRatio: 1 }}
            >
                <img
                    src={product?.img_preview_url}
                    alt=""
                    className="h-full w-full object-cover transition-all duration-500"
                />
                {!isSelected && (
                    <div
                        className="absolute right-2 top-2 z-20 size-8 cursor-pointer rounded-full bg-black md:size-9 
                    [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsFavor(!isFavor);
                            if (!isAuthenticated) {
                                toast.warn('Login to save favorite product!');
                            }
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
                                {product?.sizes.map((size, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`relative h-10 cursor-pointer p-1
                                            text-center text-white ring-1 ring-white
                                            hover:bg-white hover:text-black 
                                            ${size.quantity_in_stock <= 0 && 'cursor-not-allowed bg-white !text-black opacity-50'}`}
                                        >
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                                {size.size}
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

                {product?.total_quantity > 0 &&
                    product?.discount &&
                    !isSelected && (
                        <div className="absolute left-5 top-0 flex h-[24%] w-[15%] items-center justify-center rounded-b-full bg-black">
                            <span className="inline-block -rotate-90 text-white">
                                -{product?.discount}%
                            </span>
                        </div>
                    )}
            </Link>
            <div className="flex items-center justify-between p-2">
                <div className="flex-1 shrink-0">
                    {product?.total_quantity <= 0 && (
                        <span className="text-red-400">Sold out</span>
                    )}
                    <Link
                        to={`/${product?.brand?.code}/${product?.shoe_type?.code}/${product?.id}`}
                        className="text-limit-1 text-lg font-medium"
                    >
                        {product?.name}
                    </Link>
                    <div>
                        <span className="font-semibold">
                            $
                            {Math.ceil(
                                (product?.price * (100 - product?.discount)) /
                                    100,
                            )}
                        </span>
                        {product?.total_quantity > 0 && product?.discount ? (
                            <span className="ml-1 text-slate-500 line-through">
                                ${product?.price}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {product?.total_quantity > 0 && (
                    <IoBagHandle
                        className="box-content size-6 cursor-pointer rounded-full 
                    bg-white p-2 text-black transition-colors duration-300 hover:bg-black hover:text-white"
                        onClick={() => setIsSelected(!isSelected)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCard;
