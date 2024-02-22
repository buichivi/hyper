import { Link, useNavigate } from 'react-router-dom';
import TippyHeadless from '@tippyjs/react/headless';

import { HiOutlineUserCircle } from 'react-icons/hi2';
import { PiShoppingBagLight } from 'react-icons/pi';
import { CiSearch, CiHeart } from 'react-icons/ci';
import MenuItem from '../MenuItem/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/actions';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineProfile } from 'react-icons/ai';
import { GoChecklist } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const cart = useSelector((state) => state.cart.items);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [brands, setBrands] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const totalProducts = cart.reduce(
        (acc, cartItem) => acc + cartItem?.quantity,
        0,
    );

    useEffect(() => {
        request.get('/brand').then((res) => setBrands(res.data.brands));
    }, []);

    return (
        <div className="fixed left-0 top-0 z-50 h-auto w-full ">
            {!isAuthenticated && (
                <div
                    className="flex h-[28px] items-center justify-end bg-slate-200 px-4 md:px-14 2xl:px-[15%]
                [&>*]:px-2"
                >
                    <Link to="/login" className="border-r border-r-slate-400">
                        <span>Sign in</span>
                    </Link>
                    <Link to="/signup">
                        <span>Sign Up</span>
                    </Link>
                </div>
            )}
            <div className="flex h-[72px] items-center justify-between bg-white px-4 md:px-14 2xl:px-[15%]">
                <Link className="flex h-full flex-1 items-center" to="/">
                    <h3 className="font-BebasNeue text-3xl font-bold">HYPER</h3>
                </Link>
                <div className="hidden h-full flex-[2] items-center justify-center gap-10 lg:flex">
                    {brands?.map((brand, index) => {
                        return (
                            <div key={index} className="h-full">
                                <MenuItem
                                    brand={brand}
                                    isLogin={isAuthenticated}
                                />
                            </div>
                        );
                    })}
                    <Link
                        to=""
                        className="relative flex h-full w-fit items-center 
                        justify-center text-lg font-medium 
                        before:absolute before:bottom-0 before:left-0 before:h-[2px]
                        before:w-0 before:bg-black before:transition-all before:duration-300 
                        before:content-[''] hover:before:w-full"
                    >
                        About us
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end gap-5">
                    <div className="relative flex h-8 w-56 flex-shrink-0 flex-grow-0 items-center">
                        <input
                            type="checkbox"
                            id="search-input-toggle"
                            className="peer/search-input hidden"
                            onChange={(e) => {
                                const inputSearch =
                                    e.target.nextSibling.nextSibling;
                                const searchBtn = e.target.nextSibling;
                                if (e.target.checked) {
                                    inputSearch.focus();
                                    searchBtn.style.pointerEvents = 'none';
                                }
                            }}
                        />
                        <label
                            htmlFor="search-input-toggle"
                            className="absolute right-0 z-10 transition-all duration-500 peer-checked/search-input:right-[86%]"
                        >
                            <CiSearch className="h-6 w-6 cursor-pointer" />
                        </label>
                        <input
                            spellCheck={false}
                            type="text"
                            placeholder="Search..."
                            className="peer/search-input absolute left-full
                            right-0 rounded-full border border-transparent p-2
                            text-sm outline-none transition-all duration-500 
                            peer-checked/search-input:left-0 peer-checked/search-input:border-black
                            peer-checked/search-input:pl-8
                            "
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={(e) => {
                                const checkbox =
                                    e.target.previousSibling.previousSibling;
                                const searchBtn = e.target.previousSibling;
                                if (!e.target.value) {
                                    checkbox.checked = false;
                                    searchBtn.style.pointerEvents = 'auto';
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode == 13) {
                                    navigate('/search?' + searchQuery);
                                }
                            }}
                        />
                        <span
                            className="absolute right-3 cursor-pointer peer-placeholder-shown/search-input:hidden"
                            onClick={(e) => {
                                const searchInput = e.target.previousSibling;
                                setSearchQuery('');
                                searchInput.focus();
                            }}
                        >
                            &#10005;
                        </span>
                    </div>
                    <div className="h-6 w-[1px] bg-[#838383]"></div>
                    <Link to="/favorites">
                        <CiHeart className="h-6 w-6" />
                    </Link>
                    <Link to="/cart" className="relative cursor-pointer">
                        <PiShoppingBagLight
                            className="h-6 w-6"
                            onClick={() => setIsOpenCart(!isOpenCart)}
                        />
                        {totalProducts > 0 && (
                            <div
                                className="absolute -right-2 -top-2 z-10 flex size-4 
                            items-center justify-center rounded-full bg-black text-sm text-white ring-1 ring-black"
                            >
                                <span className="">{totalProducts}</span>
                            </div>
                        )}
                    </Link>
                    {isAuthenticated && (
                        <div className="relative cursor-pointer">
                            <HiOutlineUserCircle
                                className="h-6 w-6"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        key={isOpen}
                                        initial={{ y: '30%', opacity: 0 }}
                                        exit={{ y: '30%', opacity: 0 }}
                                        animate={{ y: '0%', opacity: 1 }}
                                        className="absolute right-0 top-[140%] flex min-w-[120px] select-none flex-col 
                                    border border-slate-300 bg-white p-2 shadow-lg [&>*]:px-4 [&>*]:py-1 [&>*]:text-right"
                                    >
                                        <Link
                                            to="/profile#1"
                                            className="flex items-center justify-between hover:bg-slate-200"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <AiOutlineProfile />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to="/profile#2"
                                            className="flex items-center justify-between hover:bg-slate-200"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <GoChecklist />
                                            <span>Orders</span>
                                        </Link>
                                        <div
                                            className="flex items-center justify-between hover:bg-slate-200"
                                            onClick={() =>
                                                dispatch(logOutUser())
                                            }
                                        >
                                            <MdLogout />
                                            <span>Log out</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
