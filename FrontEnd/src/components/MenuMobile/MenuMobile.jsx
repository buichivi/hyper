import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import request from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { RiProfileLine, RiSettings3Line } from 'react-icons/ri';
import { GoChecklist } from 'react-icons/go';
import { CiHeart } from 'react-icons/ci';
import { logOutUser } from '../../store/actions';
import { BiLogOut } from 'react-icons/bi';

const MenuMobile = () => {
    const dispatch = useDispatch();
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState({});
    const inputCbRef = useRef();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        request.get('/brand').then((res) => {
            setBrands(res.data.brands);
        });
    }, []);

    return (
        <div className="flex flex-1 items-center justify-start lg:hidden">
            <input
                type="checkbox"
                className="peer/submenu-toggle hidden"
                id="submenu-toggle"
                ref={inputCbRef}
            />
            <label
                className="group z-[60] flex h-5 w-6 cursor-pointer flex-col items-end justify-around gap-[2px] [&>*]:flex-shrink-0 [&>*]:transition-all [&>*]:duration-500"
                htmlFor="submenu-toggle"
            >
                <span className="inline-block h-[2px] w-full bg-black"></span>
                <span className="inline-block h-[2px] w-[70%] bg-black group-hover:w-full"></span>
                <span className="inline-block h-[2px] w-[80%] bg-black group-hover:w-full"></span>
            </label>
            <div className="fixed left-0 top-0 z-50 h-screen w-[60vw] -translate-x-full bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1.0)] peer-checked/submenu-toggle:translate-x-0">
                <AnimatePresence>
                    <div className="h-full px-4 pt-[30%] md:px-10 md:pt-[20%]">
                        {!isShowSubMenu ? (
                            <motion.div
                                key={isShowSubMenu}
                                className="flex h-full flex-col"
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '0', opacity: 1 }}
                            >
                                {brands?.map((brand, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex cursor-pointer items-center justify-between gap-2 py-2 text-lg hover:opacity-70"
                                            onClick={() => {
                                                setIsShowSubMenu(
                                                    !isShowSubMenu,
                                                );
                                                setSelectedBrand(brand);
                                            }}
                                        >
                                            <span className="cursor-pointer">
                                                {brand?.name}
                                            </span>
                                            <MdOutlineArrowForwardIos />
                                        </div>
                                    );
                                })}
                                {!isAuthenticated && (
                                    <div className="pt-8">
                                        <span className="text-lg text-slate-400">
                                            Become a Nike Member for the best
                                            products, inspiration and stories in
                                            sport.
                                        </span>
                                        <div className="flex items-center justify-between gap-4 pt-4">
                                            <Link
                                                to="/login"
                                                className="flex-1 bg-black py-2 text-center text-white ring-1 ring-black transition-colors hover:bg-white hover:text-black"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="flex-1 py-2 text-center ring-1 ring-black transition-colors hover:bg-black hover:text-white"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {isAuthenticated && (
                                    <div
                                        className="flex flex-1 flex-col justify-end py-8 md:hidden"
                                        onClick={() =>
                                            (inputCbRef.current.checked = false)
                                        }
                                    >
                                        <Link
                                            to={'/favorites'}
                                            className="flex items-center gap-2 py-2 text-lg"
                                        >
                                            <CiHeart />
                                            <span>Favorites</span>
                                        </Link>
                                        <Link
                                            to={'/profile#0'}
                                            className="flex items-center gap-2 py-2 text-lg"
                                        >
                                            <RiSettings3Line />
                                            <span>Setting</span>
                                        </Link>
                                        <Link
                                            to={'/profile#1'}
                                            className="flex items-center gap-2 py-2 text-lg"
                                        >
                                            <RiProfileLine />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to={'/profile#2'}
                                            className="flex items-center gap-2 py-2 text-lg"
                                        >
                                            <GoChecklist />
                                            <span>Orders</span>
                                        </Link>
                                        <button
                                            className="mt-10 flex w-full items-center justify-center gap-2 bg-black py-2 text-white"
                                            onClick={() =>
                                                dispatch(logOutUser())
                                            }
                                        >
                                            <BiLogOut />
                                            <span>Log out</span>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={isShowSubMenu}
                                className=""
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '0', opacity: 1 }}
                            >
                                <div
                                    className="flex w-fit cursor-pointer items-center gap-2 pb-2 text-lg"
                                    onClick={() =>
                                        setIsShowSubMenu(!isShowSubMenu)
                                    }
                                >
                                    <MdOutlineArrowBackIos />
                                    <span>All</span>
                                </div>
                                <Link
                                    to={`/${selectedBrand?.code}`}
                                    className="flex w-fit cursor-pointer items-center justify-between gap-2 py-2 text-lg hover:opacity-70"
                                    onClick={() => {
                                        setIsShowSubMenu(!isShowSubMenu);
                                        inputCbRef.current.checked = false;
                                    }}
                                >
                                    <span>All {selectedBrand?.name}</span>
                                </Link>
                                {selectedBrand?.shoe_types.map(
                                    (shoe_type, index) => {
                                        return (
                                            <Link
                                                to={`/${selectedBrand?.code}/${shoe_type?.code}`}
                                                key={index}
                                                className="flex w-fit cursor-pointer items-center justify-between gap-2 py-2 text-lg hover:opacity-70"
                                                onClick={() => {
                                                    setIsShowSubMenu(
                                                        !isShowSubMenu,
                                                    );
                                                    inputCbRef.current.checked = false;
                                                }}
                                            >
                                                <span>{shoe_type?.name}</span>
                                            </Link>
                                        );
                                    },
                                )}
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>
            </div>
            <label
                htmlFor="submenu-toggle"
                className="fixed left-0 top-0 z-10 hidden h-screen w-screen bg-[#eeeeee1a] backdrop-blur-sm transition-colors duration-500 peer-checked/submenu-toggle:block"
            ></label>
        </div>
    );
};

export default MenuMobile;
