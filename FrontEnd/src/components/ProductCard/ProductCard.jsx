import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { IoBagHandle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import request from '../../utils/request';
import { addItemToCart } from '../../store/actions';

const ProductCard = ({ product = {}, isFavorite = false }) => {
    const [isFavor, setIsFavor] = useState(isFavorite);
    const [isSelected, setIsSelected] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const { ref, inView } = useInView();

    useEffect(() => {
        setIsFavor(isFavorite);
    }, [isFavorite]);

    const handleFavoriteProduct = async (e) => {
        e.preventDefault();
        if (!isAuthenticated && !isFavor) {
            toast.warn('Please login to add favorite product');
        }
        if (isAuthenticated && !isFavor) {
            await request
                .post('/me/favorites', {
                    product_id: product?.id,
                })
                .then(() => {
                    toast.success('Add favorite product successfully!');
                    setIsFavor(true);
                })
                .catch(() => toast.error('Something went wrong!'));
        }
        if (isAuthenticated && isFavor) {
            await request
                .delete('/me/favorites', {
                    params: {
                        product_id: product?.id,
                    },
                })
                .then(() => {
                    toast.success('Remove favorite product successfully!');
                    setIsFavor(false);
                })
                .catch(() => toast.error('Something went wrong!'));
        }
    };

    const handleAddToCart = async (size) => {
        if (!isAuthenticated) {
            toast.error('You need to log in to add products to your cart');
            return;
        }
        dispatch(
            addItemToCart({
                product_id: product?.id,
                size: size,
                quantity: 1,
            }),
        );
        setIsSelected(false);
    };

    return (
        <div
            ref={ref}
            className="select-none overflow-hidden border-[1px] border-transparent"
        >
            {inView ? (
                <>
                    <Link
                        to={`/${product?.brand?.code}/${product?.shoe_type?.code}/${product?.id}`}
                        className="relative block w-full overflow-hidden"
                        style={{ aspectRatio: 1 }}
                    >
                        <img
                            src={product?.img_preview}
                            alt=""
                            className="h-full w-full object-cover transition-all duration-500"
                        />
                        {!isSelected && (
                            <div
                                className="absolute right-2 top-2 z-[1] size-8 cursor-pointer rounded-full bg-black md:size-9 [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2"
                                onClick={handleFavoriteProduct}
                            >
                                {!isFavor ? (
                                    <IoIosHeartEmpty className="size-5 text-white md:size-6" />
                                ) : (
                                    <IoIosHeart className="size-5 text-white  md:size-6" />
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
                                    <h4 className="px-2 text-lg text-white">
                                        Select size:
                                    </h4>
                                    <div className="relative grid grid-cols-4 gap-2 p-2">
                                        {product?.sizes.map((size, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`relative h-10 cursor-pointer p-1
                                                    text-center text-white ring-1 ring-white
                                                    hover:bg-white hover:text-black 
                                                    ${size.quantity_in_stock <= 0 && 'cursor-not-allowed bg-white !text-black opacity-50'}`}
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            size.size,
                                                        )
                                                    }
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
                                    <span className="inline-block -rotate-90 text-sm text-white md:text-base">
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
                                className="text-limit-1 text-base font-medium md:text-xl"
                            >
                                {product?.name}
                            </Link>
                            <div className="text-xl">
                                <span className="font-semibold">
                                    $
                                    {Math.ceil(
                                        (product?.price *
                                            (100 - product?.discount)) /
                                            100,
                                    )}
                                </span>
                                {product?.total_quantity > 0 &&
                                product?.discount ? (
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
                </>
            ) : (
                <>
                    <div className="flex w-full animate-pulse flex-col">
                        <div
                            className="w-full animate-pulse bg-slate-200 p-4"
                            style={{ aspectRatio: 1 }}
                        >
                            <div className="size-full bg-slate-100"></div>
                        </div>
                        <div className="flex h-[60px] w-full animate-pulse flex-col gap-2 bg-slate-200 px-4 pb-2">
                            <div className="w-full flex-1 bg-slate-100"></div>
                            <div className="w-full flex-1 bg-slate-100"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
    isFavorite: PropTypes.bool,
};

export default ProductCard;
