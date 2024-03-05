import { Link, useNavigate } from 'react-router-dom';
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
import { IoIosSettings } from 'react-icons/io';
import { PuffLoader } from 'react-spinners';
import MenuMobile from '../MenuMobile/MenuMobile';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const cart = useSelector((state) => state.cart.items);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const totalProducts = cart.reduce(
        (acc, cartItem) => acc + cartItem?.quantity,
        0,
    );

    const [brands, setBrands] = useState();
    useEffect(() => {
        request.get('/brand').then((res) => setBrands(res.data.brands));
    }, []);

    return (
        <div className="fixed left-0 top-0 z-[3] h-auto w-full">
            <input
                type="checkbox"
                id="toggle-search-mobile"
                className="peer/toggle-search-mobile hidden"
                onChange={(e) => {
                    if (e.currentTarget.checked) {
                        e.currentTarget.nextSibling.children[0].focus();
                    }
                }}
            />
            <div className="border-1 absolute left-0 top-0 -z-[1] h-auto w-screen  bg-red-300 shadow-md transition-all duration-500 peer-checked/toggle-search-mobile:top-full">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border-b border-b-black px-4 py-2 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode == 13 && searchQuery) {
                            setIsLoading(true);
                            setTimeout(() => {
                                setIsLoading(false);
                                navigate('/search/' + searchQuery);
                                e.target.parentElement.previousSibling.checked = false;
                            }, 1000);
                        }
                    }}
                    onBlur={(e) => {
                        if (!searchQuery)
                            e.target.parentElement.previousSibling.checked = false;
                    }}
                />
                {searchQuery && (
                    <span
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer peer-placeholder-shown/search-input:hidden"
                        onClick={() => {
                            setSearchQuery('');
                        }}
                    >
                        &#10005;
                    </span>
                )}
            </div>
            {!isAuthenticated && (
                <div className="hidden h-[28px] items-center justify-end bg-black px-4 text-white md:px-14 lg:flex 2xl:px-[15%] [&>*]:px-2">
                    <Link to="/login" className="border-r border-r-slate-400">
                        <span>Sign in</span>
                    </Link>
                    <Link to="/signup">
                        <span>Sign Up</span>
                    </Link>
                </div>
            )}
            <div className="relative flex h-[72px] items-center justify-between bg-white px-4 shadow-sm md:px-14 2xl:px-[15%]">
                <MenuMobile />
                <div className="flex h-full over flex-1 shrink-0 items-center justify-center lg:block">
                    <Link
                        className="flex h-full w-fit items-center justify-center lg:justify-normal"
                        to="/"
                    >
                        <img
                            src="/shoes-store/src/assets/images/Hyper-logo.png"
                            alt=""
                            className="size-40 object-cover object-center"
                        />
                    </Link>
                </div>
                <div className="hidden h-full flex-[2] items-center justify-center gap-10 lg:flex">
                    {brands?.map((brand, index) => {
                        return (
                            <div
                                key={index}
                                className="flex h-full items-center justify-center"
                            >
                                <MenuItem
                                    brand={brand}
                                    isLogin={isAuthenticated}
                                    className="peer/menu-item"
                                />
                                <div className="fixed left-0 top-0 -z-10 hidden h-screen w-screen bg-[#eeeeee00] backdrop-blur-sm peer-hover/menu-item:block"></div>
                            </div>
                        );
                    })}
                    <Link
                        to=""
                        className="relative flex h-fit w-fit items-center justify-center text-lg font-medium before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-300 before:content-[''] hover:before:w-full"
                    >
                        About us
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end gap-5">
                    <label
                        htmlFor="toggle-search-mobile"
                        className="block lg:hidden"
                    >
                        <CiSearch className="h-6 w-6 cursor-pointer" />
                    </label>

                    <div
                        className="relative hidden h-12 w-56 shrink-0 flex-grow-0 items-center 
                        overflow-hidden p-1 lg:flex"
                    >
                        <input
                            id="search-input-toggle"
                            type="checkbox"
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
                            className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 transition-all duration-500"
                        >
                            <CiSearch className="h-6 w-6 cursor-pointer" />
                        </label>

                        <input
                            spellCheck={false}
                            type="text"
                            placeholder="Search..."
                            className="absolute right-0 top-1/2 h-10 w-0 -translate-y-1/2 border border-transparent  text-sm outline-none transition-all duration-500 peer-checked/search-input:w-full peer-checked/search-input:border-slate-900 peer-checked/search-input:p-2 peer-checked/search-input:pr-[25%]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode == 13 && searchQuery != '') {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        navigate('/search/' + searchQuery);
                                    }, 1000);
                                }
                            }}
                            onBlur={(e) => {
                                const checkbox =
                                    e.target.previousSibling.previousSibling;
                                const searchBtn = e.target.previousSibling;
                                if (!e.target.value) {
                                    checkbox.checked = false;
                                    searchBtn.style.pointerEvents = 'auto';
                                }
                            }}
                        />
                        {searchQuery && (
                            <span
                                className="absolute right-9 cursor-pointer peer-placeholder-shown/search-input:hidden"
                                onClick={(e) => {
                                    setSearchQuery('');
                                    e.currentTarget.previousSibling.focus();
                                }}
                            >
                                &#10005;
                            </span>
                        )}
                    </div>
                    <div className="hidden h-6 w-[1px] bg-[#838383] lg:inline-block"></div>
                    <Link to="/favorites" className="hidden md:inline-block">
                        <CiHeart className="h-6 w-6" />
                    </Link>
                    <Link to="/cart" className="relative cursor-pointer">
                        <PiShoppingBagLight
                            className="h-6 w-6"
                            onClick={() => setIsOpenCart(!isOpenCart)}
                        />
                        {totalProducts > 0 && (
                            <div
                                className="absolute -right-2 -top-2 z-[1] flex size-4 
                            items-center justify-center rounded-full bg-black text-sm text-white ring-1 ring-black"
                            >
                                <span className="">{totalProducts}</span>
                            </div>
                        )}
                    </Link>
                    {isAuthenticated && (
                        <div className="relative hidden cursor-pointer md:inline-block">
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
                                            to="/profile#0"
                                            className="flex items-center justify-between hover:bg-slate-200"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <IoIosSettings />
                                            <span>Settings</span>
                                        </Link>
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
            {isLoading && (
                <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#000000ce]">
                    <PuffLoader color="#fff" size={80} />
                </div>
            )}
        </div>
    );
};

export default Header;
