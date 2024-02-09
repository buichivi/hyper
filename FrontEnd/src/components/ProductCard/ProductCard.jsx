import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';
import { BRANDS } from '../../constants';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { motion } from 'framer-motion';

const ProductCard = ({
    id = '0',
    brandName = '',
    sizes = [],
    isFavorShoe = false,
}) => {
    const [isFavor, setIsFavor] = useState(isFavorShoe);
    const [isSelected, setIsSelected] = useState(false);
    const nextBtnRef = useRef(null);
    const prevBtnRef = useRef(null);

    const BrandLogo = BRANDS.filter((brand) => brand.name == brandName)[0].logo;

    return (
        <div className="group select-none overflow-hidden border-[1px] border-transparent hover:border-[#242424]">
            <Link
                to={`/product/${id}`}
                className="relative block w-full overflow-hidden "
                style={{ aspectRatio: 1 }}
            >
                <img
                    src="https://shorturl.at/nszNY"
                    alt=""
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <motion.div
                    className="absolute right-2 top-2 z-20 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFavor(!isFavor);
                    }}
                    whileHover={{ scale: 1.3, type: 'spring' }}
                >
                    {!isFavor ? (
                        <IoIosHeartEmpty className="h-5 w-5 text-black" />
                    ) : (
                        <IoIosHeart className="h-5 w-5 text-black" />
                    )}
                </motion.div>
                <div className="absolute left-1 top-1">
                    <BrandLogo className="h-8 w-8" />
                </div>
                <div
                    className={`absolute bottom-0 left-0 z-10 h-[30px] w-full bg-black ${
                        isSelected ? 'translate-y-0' : 'translate-y-full'
                    } transition-all duration-300`}
                    onClick={(e) => e.preventDefault()}
                >
                    <div
                        ref={prevBtnRef}
                        className="absolute left-0 top-0 z-20 flex h-full items-center justify-center text-white "
                    >
                        <MdKeyboardArrowLeft className="h-6 w-6" />
                    </div>
                    <Swiper
                        slidesPerView={sizes.length > 5 ? 5 : sizes.length}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl =
                                prevBtnRef.current;
                            swiper.params.navigation.nextEl =
                                nextBtnRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        modules={[Navigation]}
                        className="w-[80%] overflow-hidden"
                    >
                        {sizes.map((size, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className={`text-center ${
                                        index == 0 &&
                                        'border-l-[1px] border-l-white'
                                    } border-r-[1px] border-r-white`}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span
                                        className={`block h-full text-center leading-[30px] text-white 
                                        transition-colors duration-300 hover:bg-white hover:text-black`}
                                    >
                                        {size}
                                    </span>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <div
                        ref={nextBtnRef}
                        className="absolute right-0 top-0 z-20 flex h-full items-center justify-center text-white"
                    >
                        <MdKeyboardArrowRight className="h-6 w-6" />
                    </div>
                </div>
                <div
                    className={`absolute left-0 top-0 h-full w-full ${
                        isSelected ? 'bg-[#00000057]' : 'bg-transparent'
                    } transition-colors duration-300`}
                ></div>
            </Link>
            <div className="flex items-center justify-between p-2">
                <div className="flex-1 shrink-0">
                    <Link
                        to={`/product/${id}`}
                        className="text-limit-1 text-lg font-medium"
                    >
                        Nike Air Force 1
                    </Link>
                    <span className="capitalize">{brandName}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="font-medium">$200.00</span>
                    <div
                        className=" group/add-to-cart flex h-6 w-12 cursor-pointer items-center justify-center border-[1px] border-transparent
                        bg-black transition-all duration-300 hover:border-black hover:bg-white lg:w-6"
                        onClick={() => setIsSelected(!isSelected)}
                    >
                        <LuPlus
                            className={`h-full text-white group-hover/add-to-cart:text-black ${
                                isSelected && 'rotate-45'
                            } transition-all duration-300`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
