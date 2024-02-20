import { useEffect, useState } from 'react';
import { CartItem, Navigation } from '../../components';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { clearAllItemFromCart } from '../../store/actions';

const Cart = () => {
    const [progress, setProgress] = useState(0);
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    console.log('Cart re-render');

    const totalProducts = cart.reduce(
        (acc, cartItem) => acc + cartItem?.quantity,
        0,
    );
    const subTotal = cart.reduce(
        (acc, cartItem) => acc + cartItem?.product?.price * cartItem?.quantity,
        0,
    );
    const total = cart.reduce(
        (acc, cartItem) =>
            acc +
            Math.ceil(
                (cartItem?.product?.price *
                    (100 - cartItem?.product?.discount)) /
                    100,
            ) *
                cartItem?.quantity,
        0,
    );

    const animation = {
        open: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: '-100%',
            opacity: 0,
        },
    };

    const orderDetailForm = useFormik({
        initialValues: {},
    });

    return (
        <div>
            <Navigation path={[{ path: '/cart', name: 'Cart' }]} />
            {cart.length > 0 && (
                <div className="relative mx-auto flex w-1/2 items-center justify-between gap-[10%] py-8">
                    <span className="absolute left-0 top-1/2 -z-10 h-[2px] w-full -translate-y-1/2 bg-black"></span>
                    <div className="flex w-full items-center justify-between [&>span]:block [&>span]:text-center">
                        {['Cart', 'Address', 'Payment'].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`relative top-full size-8 rounded-full 
                                bg-white text-center leading-8 ring-1 ring-black 
                                ${index <= progress && '!bg-black !text-white'} cursor-pointer select-none`}
                                    onClick={() => setProgress(index)}
                                >
                                    {index + 1}
                                    <span className="absolute left-1/2 top-full -translate-x-1/2 font-medium text-black">
                                        {item}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="py-4">
                <AnimatePresence>
                    {progress == 0 && (
                        <motion.div
                            key={progress}
                            initial="exit"
                            animate="open"
                            exit="exit"
                            variants={animation}
                        >
                            <h3 className="text-4xl font-medium capitalize">
                                My cart
                            </h3>
                            <div className="flex items-start justify-between gap-6 pt-6">
                                <div
                                    className={`h-full basis-[70%] ${cart.length == 0 && 'h-[50vh] !flex-1'}`}
                                >
                                    {cart.length > 0 ? (
                                        <>
                                            {cart.map((cartItem, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            paddingTop:
                                                                index > 0 &&
                                                                '8px',
                                                        }}
                                                    >
                                                        <CartItem
                                                            cartItem={cartItem}
                                                        />
                                                    </div>
                                                );
                                            })}
                                            <div className="flex items-center justify-between pt-4">
                                                <Link
                                                    to="/"
                                                    className="flex w-fit items-center gap-2 pt-4 hover:opacity-70"
                                                >
                                                    <HiArrowNarrowLeft
                                                        size={22}
                                                    />
                                                    <span className="font-medium capitalize">
                                                        Continue shopping
                                                    </span>
                                                </Link>
                                                <button
                                                    className="flex items-center 
                                                    gap-2 border border-black bg-white px-4 py-2 
                                                    text-black shadow-lg transition-colors hover:border-white hover:bg-red-500 hover:text-white"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Do you want to remove all items from your cart?',
                                                            )
                                                        ) {
                                                            dispatch(
                                                                clearAllItemFromCart(),
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <span>Clear Cart</span>
                                                    <BsFillTrash3Fill />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="relative left-1/2 top-0 size-52 -translate-x-1/2">
                                            <img
                                                src="/src/assets/images/cart-empty.png"
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                                {cart.length > 0 && (
                                    <div className="sticky top-[72px] flex-1">
                                        <div className="border-[1px] border-slate-300 p-4">
                                            <h4 className="border-b border-b-slate-200 pb-2 text-xl font-medium">
                                                Summary Order
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2 border-b border-b-slate-200 pb-2 pt-2">
                                                <span>
                                                    Quantity of products
                                                </span>
                                                <span className="text-right">
                                                    {totalProducts}
                                                </span>
                                                <span>Subtotal</span>
                                                <span className="text-right">
                                                    ${subTotal}
                                                </span>
                                                <span>Total discount</span>
                                                <span className="text-right">
                                                    ${subTotal - total}
                                                </span>
                                                <span>Delivery charges</span>
                                                <span className="text-right">
                                                    Free Delivery
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 pt-2">
                                                <span>Total</span>
                                                <span className="text-right font-bold">
                                                    ${total}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className="mt-3 w-full border 
                                        border-black bg-black py-3 uppercase text-white
                                        transition-colors hover:bg-white hover:text-black"
                                            onClick={() => {
                                                setProgress(progress + 1);
                                            }}
                                        >
                                            Place order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                    {progress == 1 && (
                        <motion.div
                            key={progress}
                            initial="exit"
                            animate="open"
                            exit="exit"
                            variants={animation}
                        >
                            <button
                                className="flex items-center gap-2 p-2 hover:opacity-60"
                                onClick={() => setProgress(progress - 1)}
                            >
                                <IoReturnUpBackSharp />
                                <span className="text-lg">Back</span>
                            </button>
                            <h3 className="text-4xl font-medium capitalize">
                                Address
                            </h3>
                            <div></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Cart;
