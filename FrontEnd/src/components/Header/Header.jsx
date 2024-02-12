import { Link } from 'react-router-dom';
import TippyHeadless from '@tippyjs/react/headless';

import { HiOutlineUserCircle } from 'react-icons/hi2';
import { PiShoppingBagLight } from 'react-icons/pi';
import { CiSearch, CiHeart } from 'react-icons/ci';
import MenuItem from '../MenuItem/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/actions';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import brandLogos from '../../utils/brandLogos';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const [brands, setBrands] = useState();

    console.log(brands);
    useEffect(() => {
        request.get('/brand').then((res) => setBrands(res.data.brands));
    }, []);

    return (
        <div className="fixed left-0 top-0 z-50 h-auto w-full ">
            {!isAuthenticated && (
                <div
                    className="flex h-[24px] items-center justify-end bg-slate-200 px-4 md:px-14 2xl:px-[15%]
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
                                    Logo={
                                        brandLogos.filter(
                                            (brandLogo) =>
                                                brandLogo.brandCode ==
                                                brand.code,
                                        )[0].brandLogo
                                    }
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
                            className="absolute right-0 z-10 transition-all duration-500 peer-checked/search-input:right-[88%]"
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
                        <span
                            className="absolute right-2 cursor-pointer peer-placeholder-shown/search-input:hidden"
                            onClick={(e) => {
                                const searchInput = e.target.previousSibling;
                                searchInput.value = '';
                                searchInput.focus();
                            }}
                        >
                            &#10005;
                        </span>
                    </div>
                    <div className="h-6 w-[1px]   bg-[#838383]"></div>
                    <Link to="/favorites">
                        <CiHeart className="h-6 w-6" />
                    </Link>
                    <Link to="/cart">
                        <PiShoppingBagLight className="h-6 w-6 " />
                    </Link>

                    {isAuthenticated && (
                        <div
                            onClick={() => dispatch(logOutUser())}
                            className="cursor-pointer"
                        >
                            <HiOutlineUserCircle className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
