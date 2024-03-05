import { useEffect, useRef, useState } from 'react';
import {
    CartItem,
    CustomerInfo,
    Navigation,
    Payment,
    SummaryOrder,
} from '../../components';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { clearAllItemFromCart, removeItemFromCart } from '../../store/actions';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners';

const Cart = () => {
    const [progress, setProgress] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({});
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const customerForm = useRef();
    const [isPurchase, setIsPurchase] = useState(false);

    const user = useSelector((state) => state.user.user);

    console.log(user);

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                ${index <= progress && '!bg-black !text-white'} select-none`}
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
                            <Link
                                to="/"
                                className="flex w-fit items-center gap-2 pb-4 pt-4 hover:opacity-70 md:hidden"
                            >
                                <HiArrowNarrowLeft size={22} />
                                <span className="font-medium capitalize">
                                    Continue shopping
                                </span>
                            </Link>
                            <div className="flex items-end justify-between">
                                <h3 className="text-4xl font-medium capitalize">
                                    My cart
                                </h3>
                                {cart.length > 0 && (
                                    <button
                                        className="flex items-center gap-2 border border-black bg-white px-4 py-2 text-black shadow-lg transition-colors hover:border-white hover:bg-red-500 hover:text-white md:hidden"
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
                                )}
                            </div>
                            <div className="flex flex-col items-start justify-between gap-6 pt-6 md:flex-row">
                                <div
                                    className={`h-full w-full md:basis-[70%] ${cart.length == 0 && 'h-[50vh] !flex-1'}`}
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
                                            <div className="hidden items-center justify-between pt-4 md:flex">
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
                                                src="/shoes-store/src/assets/images/cart-empty.png"
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                                {cart.length > 0 && (
                                    <SummaryOrder
                                        totalProducts={totalProducts}
                                        subTotal={subTotal}
                                        total={total}
                                        onProgress={() => {
                                            request
                                                .post('/checking-product', {
                                                    product_carts: cart.map(
                                                        (cartItem) => ({
                                                            cart_id:
                                                                cartItem.id,
                                                            product_name:
                                                                cartItem.product
                                                                    .name,
                                                            product_id:
                                                                cartItem.product_id,
                                                            size: cartItem.size,
                                                            quantity:
                                                                cartItem.quantity,
                                                        }),
                                                    ),
                                                })
                                                .then(() =>
                                                    setProgress(
                                                        (prev) => prev + 1,
                                                    ),
                                                )
                                                .catch((err) => {
                                                    const cart_id =
                                                        err.response.data
                                                            .cart_id;
                                                    dispatch(
                                                        removeItemFromCart(
                                                            cart_id,
                                                        ),
                                                    );
                                                    toast.error(
                                                        err.response.data
                                                            .message ||
                                                            'Something went wrong!',
                                                    );
                                                });
                                        }}
                                        textBtn={'Next step'}
                                    />
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

                            <div className="flex flex-col items-start gap-10 md:flex-row">
                                <div className="w-full basis-full md:basis-[70%]">
                                    {user && (
                                        <CustomerInfo
                                            user={user}
                                            ref={customerForm}
                                            onSubmitForm={({ values }) => {
                                                setCustomerInfo(values);
                                                setProgress((prev) => prev + 1);
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="w-full flex-1">
                                    <SummaryOrder
                                        totalProducts={totalProducts}
                                        subTotal={subTotal}
                                        total={total}
                                        onProgress={() => {
                                            customerForm.current.click();
                                        }}
                                        textBtn="Next Step"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {progress == 2 && (
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
                                Payment
                            </h3>
                            <Payment
                                info={customerInfo}
                                subTotal={subTotal}
                                total={total}
                                setIsPurchase={setIsPurchase}
                            />
                            <div className="flex items-start gap-10"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {isPurchase && (
                    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#000000ce]">
                        <PuffLoader color="#fff" size={80} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
