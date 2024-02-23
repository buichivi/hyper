import React, { useEffect, useRef, useState } from 'react';
import CustomerInfo from '../../components/CustomerInfo/CustomerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { logOutUser } from '../../store/actions';

const Profile = () => {
    const [section, setSection] = useState(0);
    const saveBtn = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const sectionIndex = location.hash.slice(1);

    const [curPass, setCurPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setSection(sectionIndex);
        if (sectionIndex == 2) {
            request
                .get('/me/order/all')
                .then((res) => setOrders(res.data.orders));
        }
    }, [sectionIndex, location]);

    const user = useSelector((state) => state.user.user);

    return (
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                <div className="relative my-4 w-56 sm:hidden">
                    <input
                        className="peer hidden"
                        type="checkbox"
                        name="select-1"
                        id="select-1"
                    />
                    <label
                        htmlFor="select-1"
                        className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-slate-900 peer-checked:ring"
                    >
                        Accounts{' '}
                    </label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-slate-900 hover:text-white">
                            Accounts
                        </li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-slate-900 hover:text-white">
                            Team
                        </li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-slate-900 hover:text-white">
                            Others
                        </li>
                    </ul>
                </div>

                <div className="col-span-2 hidden sm:block">
                    <ul>
                        {['Account', 'Profile', 'Order'].map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setSection(index)}
                                    className={`mt-5 cursor-pointer 
                                    px-2 py-2 transition hover:border-l-slate-900 hover:text-slate-900
                                    ${section == index && 'border-l-2  border-l-slate-900 font-semibold text-slate-900'}`}
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {section == 0 && (
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">
                                Account settings
                            </h1>
                            <p className="font- text-slate-600">
                                Change your password here.
                            </p>
                        </div>
                        <hr className="mb-8 mt-4" />
                        <p className="py-2 text-xl font-semibold">
                            Email Address
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">
                                Your email address is{' '}
                                <strong>{user?.email}</strong>
                            </p>
                        </div>
                        <hr className="mb-8 mt-4" />
                        <p className="py-2 text-xl font-semibold">Password</p>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
                                <label htmlFor="login-password">
                                    <span className="text-sm text-gray-500">
                                        Current Password
                                    </span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-slate-900">
                                        <input
                                            type="password"
                                            id="login-password"
                                            className="w-full flex-shrink appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            placeholder="***********"
                                            value={curPass}
                                            onChange={(e) =>
                                                setCurPass(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </label>
                                <label htmlFor="new-password">
                                    <span className="text-sm text-gray-500">
                                        New Password
                                    </span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-slate-900">
                                        <input
                                            type="password"
                                            id="new-password"
                                            className="w-full flex-shrink appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            placeholder="***********"
                                            required
                                            value={newPass}
                                            onChange={(e) =>
                                                setNewPass(e.target.value)
                                            }
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button
                            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
                            onClick={() => {
                                request
                                    .patch('/change-password', {
                                        current_password: curPass,
                                        new_password: newPass,
                                    })
                                    .then((res) => {
                                        toast.success(res.data.message);
                                        alert('You need to login again');
                                        navigate('/');
                                        dispatch(logOutUser());
                                    })
                                    .catch((err) => {
                                        toast.error(
                                            err.response.data.message ||
                                                'Something went wrong',
                                        );
                                    });
                            }}
                        >
                            Save Password
                        </button>
                        <hr className="mb-8 mt-4" />
                    </div>
                )}
                {section == 1 && (
                    <div className="col-span-8">
                        <CustomerInfo
                            user={user}
                            isAccountPage={true}
                            onSubmitForm={({ values }) => {
                                request
                                    .patch('/change-infomation', {
                                        ...values,
                                    })
                                    .then((res) => {
                                        toast.success(res.data.message);
                                    })
                                    .catch((err) => {
                                        toast.error(
                                            err.response.data.message ||
                                                'Something went wrong!',
                                        );
                                    });
                            }}
                            ref={saveBtn}
                        />
                        <button
                            type="submit"
                            onClick={() => saveBtn.current.click()}
                            className="rounded-md bg-black px-4 py-3 text-white ring-1 ring-black transition-colors hover:bg-white hover:text-black"
                        >
                            Save changes
                        </button>
                    </div>
                )}
                {section == 2 && (
                    <div className="col-span-8">
                        <div className="grid grid-cols-7 [&>*]:border-b [&>*]:border-b-slate-400 [&>*]:p-3">
                            <div className="border-b !border-b-slate-500 font-medium">
                                Order Id
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Customer name
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Total Price
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Order date
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Order state
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Payment
                            </div>
                            <div className="border-b !border-b-slate-500 font-medium">
                                Action
                            </div>
                            {orders.map((order) => {
                                return (
                                    <>
                                        <div>#{order?.id}</div>
                                        <div>{order?.customer_name}</div>
                                        <div>${order?.total_amount}</div>
                                        <div>{order?.order_date}</div>
                                        <div>{order?.status}</div>
                                        <div className="uppercase">
                                            {order?.payment}
                                        </div>
                                        <div>
                                            <Link
                                                to={'/order/' + order?.id}
                                                className="bg-black p-2 text-white ring-1 ring-black transition-colors hover:bg-white hover:text-black"
                                            >
                                                View detail
                                            </Link>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
