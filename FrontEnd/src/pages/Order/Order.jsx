import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import request from '../../utils/request';
import { IoReturnUpBackSharp } from 'react-icons/io5';

const Order = () => {
    const { order_id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        request
            .get('/me/order', {
                params: {
                    order_id,
                },
            })
            .then((res) => {
                setOrder(res.data.order);
            });
    }, [order_id]);

    return (
        <div className="py-8 pt-4">
            <Link
                to="/profile#2"
                className="flex w-fit items-center gap-2 p-2 hover:opacity-60"
            >
                <IoReturnUpBackSharp />
                <span className="text-lg">Back</span>
            </Link>
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="pt-8">
                    <div className="flex items-center justify-between">
                        <p className="text-3xl font-medium">
                            Order #{order?.id}
                        </p>
                        <p className="text-lg text-slate-400">
                            {order?.order_date}
                        </p>
                    </div>
                    <p className="text-gray-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {order?.order_details?.map((orderItem, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row rounded-lg bg-white sm:flex-row"
                                >
                                    <Link
                                        to={`/${orderItem?.product?.brand?.code}/${orderItem?.product?.shoe_type?.code}/${orderItem?.product?.id}`}
                                    >
                                        <img
                                            className="m-2 size-24 rounded-md border object-cover object-center"
                                            src={
                                                orderItem?.product?.img_preview
                                            }
                                            alt=""
                                        />
                                    </Link>
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <Link
                                            to={`/${orderItem?.product?.brand?.code}/${orderItem?.product?.shoe_type?.code}/${orderItem?.product?.id}`}
                                            className="font-semibold"
                                        >
                                            {orderItem?.product?.name}
                                        </Link>
                                        <span className="float-right text-gray-400">
                                            Size: {orderItem?.size}
                                        </span>
                                        <p className="text-lg font-bold">
                                            ${orderItem?.total_price}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        x
                                        <span className="font-medium">
                                            {orderItem.quantity}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                    <div className="mt-5 grid gap-6">
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_1"
                                type="radio"
                                name="radio"
                                checked={order?.payment == 'COD'}
                            />
                            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                            <label
                                className="flex  select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                                htmlFor="radio_1"
                            >
                                <img
                                    className="w-14 object-contain"
                                    src="https://firebasestorage.googleapis.com/v0/b/shoes-store-4cb03.appspot.com/o/COD-payment.png?alt=media&token=b840949b-9cc9-48ab-91c9-1b0b8cca139d"
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
                        <div className="relative">
                            <input
                                className="peer hidden"
                                id="radio_2"
                                type="radio"
                                name="radio"
                                checked={order?.payment == 'paypal'}
                            />
                            <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                            <label
                                className="flex select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                                htmlFor="radio_2"
                            >
                                <img
                                    className="w-14 object-contain"
                                    src="https://firebasestorage.googleapis.com/v0/b/shoes-store-4cb03.appspot.com/o/paypal-logo.png?alt=media&token=a0117bb0-7687-4d26-9579-23bdd2234bdd"
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
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Customer Infomation</p>
                    <p className="text-gray-400">
                        All of your order infomation here.
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
                                value={order?.customer_name}
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
                                        value={order?.email}
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
                                        value={order?.phone_number}
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
                                value={order?.province?.province_name}
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
                                        value={order?.district?.district_name}
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
                                        value={order?.ward?.ward_name}
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
                                value={order?.shipping_address}
                                className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-slate-700 focus:ring-slate-500"
                                placeholder="Your address"
                                readOnly
                            ></textarea>
                        </div>
                        {/* <!-- Total --> */}
                        <div className="mt-6 border-b border-t py-2">
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
                                ${order?.total_amount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
