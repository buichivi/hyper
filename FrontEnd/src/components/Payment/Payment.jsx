import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { clearCart } from '../../store/cartSlice';
import { useState } from 'react';
import { PaypalPayment } from '../';
import PropTypes from 'prop-types';

const Payment = ({
    info = {},
    subTotal = 0,
    total = 0,
    setIsPurchase = () => {},
}) => {
    const cart = useSelector((state) => state.cart.items);
    const [paymentMethod, setPaymentMethod] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('info', info);

    const handleCreateOrder = async () => {
        setIsPurchase(true);
        const data = {
            customer_name: info.customer_name,
            email: info.email,
            phone_number: info.phone_number,
            shipping_address: info.shipping_address,
            province: info.province,
            district: info.district,
            ward: info.ward,
            payment: 'COD',
        };
        await request
            .post('/me/order', { ...data })
            .then((res) => {
                console.log(res.data);
                toast.success(res.data.message);
                dispatch(clearCart());
                navigate('/');
            })
            .catch((err) => {
                toast.error(
                    err.response.data.message || 'Something went wrong!',
                );
            });
        setIsPurchase(false);
    };

    return (
        <div>
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cart.map((cartItem, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row rounded-lg bg-white sm:flex-row"
                                >
                                    <Link
                                        to={`/${cartItem?.product?.brand?.code}/${cartItem?.product?.shoe_type?.code}/${cartItem?.product?.id}`}
                                        className="shrink-0"
                                    >
                                        <img
                                            className="m-2 size-24  rounded-md border object-cover object-center"
                                            src={
                                                cartItem?.product
                                                    ?.img_preview_url
                                            }
                                            alt=""
                                        />
                                    </Link>
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <Link
                                            to={`/${cartItem?.product?.brand?.code}/${cartItem?.product?.shoe_type?.code}/${cartItem?.product?.id}`}
                                            className="font-semibold"
                                        >
                                            {cartItem?.product_name}
                                        </Link>
                                        <span className="float-right text-gray-400">
                                            Size: {cartItem?.size}
                                        </span>
                                        <p className="text-lg font-bold">
                                            $
                                            {Math.ceil(
                                                (cartItem.product_price *
                                                    (100 -
                                                        cartItem.product_discount)) /
                                                    100,
                                            ) * cartItem.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        x
                                        <span className="font-medium">
                                            {cartItem.quantity}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div
                            className="relative"
                            onClick={() => setPaymentMethod(0)}
                        >
                            <input
                                className="peer hidden"
                                id="radio_1"
                                type="radio"
                                name="radio"
                                checked={paymentMethod == 0}
                                onChange={(e) => e.target.checked}
                            />
                            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                            <label
                                className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                                htmlFor="radio_1"
                            >
                                <img
                                    className="w-14 object-contain"
                                    src="/shoes-store/src/assets/images/COD-payment.png"
                                    alt=""
                                />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">
                                        Payment on delivery
                                    </span>
                                    <p className="text-sm leading-6 text-slate-500">
                                        Delivery: 2-4 Days
                                    </p>
                                </div>
                            </label>
                        </div>
                        <div
                            className="relative"
                            onClick={() => setPaymentMethod(1)}
                        >
                            <input
                                className="peer hidden"
                                id="radio_2"
                                type="radio"
                                name="radio"
                                checked={paymentMethod == 1}
                                onChange={(e) => e.target.checked}
                            />
                            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                            <label
                                className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                                htmlFor="radio_2"
                            >
                                <img
                                    className="w-14 object-contain"
                                    src="/shoes-store/src/assets/images/paypal-logo.png"
                                    alt=""
                                />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">
                                        PayPal
                                    </span>
                                    <p className="text-sm leading-6 text-slate-500">
                                        Delivery: 2-4 Days
                                    </p>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Customer Infomation</p>
                    <p className="text-gray-400">
                        All of your infomation here.
                    </p>
                    <div className="">
                        <label
                            htmlFor="name"
                            className="mb-2 mt-4 block text-sm font-medium"
                        >
                            Your name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={info.customer_name}
                                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                placeholder="Your full name here"
                                readOnly
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label
                                    htmlFor="email"
                                    className="mb-2 mt-4 block text-sm font-medium"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={info.email}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                        placeholder="your.email@gmail.com"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="phone_number"
                                    className="mb-2 mt-4 block text-sm font-medium"
                                >
                                    Phone number
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={info.phone_number}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                        placeholder="Your phone number"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <label
                            htmlFor="province"
                            className="mb-2 mt-4 block text-sm font-medium"
                        >
                            Province/ City
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="province"
                                name="province"
                                value={info.province?.province_name}
                                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                placeholder="Your province"
                                readOnly
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label
                                    htmlFor="district"
                                    className="mb-2 mt-4 block text-sm font-medium"
                                >
                                    District/ Country
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        value={info.district?.district_name}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                        placeholder="Your district"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="ward"
                                    className="mb-2 mt-4 block text-sm font-medium"
                                >
                                    Ward/ Commune
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="ward"
                                        name="ward"
                                        value={info.ward?.ward_name}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                        placeholder="Your ward"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <label
                            htmlFor="address"
                            className="mb-2 mt-4 block text-sm font-medium"
                        >
                            Address
                        </label>
                        <div className="relative">
                            <textarea
                                rows={2}
                                type="text"
                                id="address"
                                name="address"
                                value={info.shipping_address}
                                className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                placeholder="Your address"
                                readOnly
                            ></textarea>
                        </div>
                        {/* <!-- Total --> */}
                        <div className="mt-6 border-b border-t py-2">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">
                                    Subtotal
                                </p>
                                <p className="font-semibold text-gray-900">
                                    ${subTotal}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">
                                    Discount
                                </p>
                                <p className="font-semibold text-gray-900">
                                    ${subTotal - total}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">
                                    Shipping
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Free
                                </p>
                            </div>
                        </div>
                        <div className="mb-4 mt-6 flex items-center justify-between">
                            <p className="font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                ${total}
                            </p>
                        </div>
                    </div>
                    {paymentMethod == 0 && (
                        <button
                            className="mb-8 mt-4 w-full bg-black px-6 py-3 font-medium text-white"
                            onClick={handleCreateOrder}
                        >
                            Place Order
                        </button>
                    )}
                    {paymentMethod == 1 && (
                        <PaypalPayment
                            info={info}
                            total={total}
                            setIsPurchase={setIsPurchase}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

Payment.propTypes = {
    info: PropTypes.object,
    subTotal: PropTypes.number,
    total: PropTypes.number,
    setIsPurchase: PropTypes.func,
};

export default Payment;
